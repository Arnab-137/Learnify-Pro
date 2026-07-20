const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const connectDB = require("../config/db");
const Subject = require("../models/Subject");
const Lecture = require("../models/Lecture");
const Completion = require("../models/Completion");

const REQUIRED_COLUMNS = [
  "Subject",
  "Lecture title",
  "Lecture number",
  "Date (YYYY-MM-DD)",
  "Video link (optional)"
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"') {
      if (quoted && nextCharacter === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }
      row.push(value.trim());
      if (row.some(Boolean)) {
        rows.push(row);
      }
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (quoted) {
    throw new Error("CSV contains an unclosed quoted value.");
  }

  row.push(value.trim());
  if (row.some(Boolean)) {
    rows.push(row);
  }

  return rows;
}

function parseSchedule(filePath) {
  const rows = parseCsv(fs.readFileSync(filePath, "utf8"));
  const [header, ...dataRows] = rows;
  const hasDuplicateDateColumn = header?.length === REQUIRED_COLUMNS.length + 1 && header.at(-1) === "Date";

  if (
    !header ||
    REQUIRED_COLUMNS.some((column, index) => header[index] !== column) ||
    header.length !== REQUIRED_COLUMNS.length && !hasDuplicateDateColumn
  ) {
    throw new Error(`CSV header must be: ${REQUIRED_COLUMNS.join(", ")}`);
  }

  if (!dataRows.length) {
    throw new Error("CSV does not contain any schedule rows.");
  }

  const scheduleRows = dataRows.map((sourceRow, index) => {
    const rowNumber = index + 2;
    if (sourceRow.length !== header.length) {
      throw new Error(`Row ${rowNumber} has ${sourceRow.length} columns; expected ${header.length}.`);
    }
    if (hasDuplicateDateColumn && sourceRow.at(-1) && sourceRow.at(-1) !== sourceRow[3]) {
      throw new Error(`Row ${rowNumber} has conflicting date columns.`);
    }

    const row = sourceRow.slice(0, REQUIRED_COLUMNS.length);
    const [subjectName, title, rawLectureNumber, date, youtubeLink] = row;
    if (!subjectName || !title || !date) {
      throw new Error(`Row ${rowNumber} must include a subject, lecture title, and date.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(`${date}T00:00:00.000Z`).getTime())) {
      throw new Error(`Row ${rowNumber} has an invalid date: ${date}. Use YYYY-MM-DD.`);
    }
    if (youtubeLink && !/^https?:\/\//i.test(youtubeLink)) {
      throw new Error(`Row ${rowNumber} has an invalid video link.`);
    }

    const subjectKey = subjectName.toLocaleLowerCase();
    const lectureNumber = rawLectureNumber ? Number(rawLectureNumber) : null;
    if (lectureNumber !== null && (!Number.isInteger(lectureNumber) || lectureNumber < 1)) {
      throw new Error(`Row ${rowNumber} has an invalid lecture number.`);
    }

    return { rowNumber, subjectName, subjectKey, title, youtubeLink, date, lectureNumber };
  });

  const usedNumbersBySubject = new Map();
  scheduleRows.forEach(({ rowNumber, subjectName, subjectKey, lectureNumber }) => {
    if (lectureNumber === null) return;
    const usedNumbers = usedNumbersBySubject.get(subjectKey) || new Set();
    if (usedNumbers.has(lectureNumber)) {
      throw new Error(`Row ${rowNumber} duplicates lecture number ${lectureNumber} for ${subjectName}.`);
    }
    usedNumbers.add(lectureNumber);
    usedNumbersBySubject.set(subjectKey, usedNumbers);
  });

  const subjectsByName = new Map();
  const lectures = scheduleRows.map((row) => {
    const usedNumbers = usedNumbersBySubject.get(row.subjectKey) || new Set();
    let lectureNumber = row.lectureNumber;
    if (lectureNumber === null) {
      lectureNumber = 1;
      while (usedNumbers.has(lectureNumber)) lectureNumber += 1;
      usedNumbers.add(lectureNumber);
      usedNumbersBySubject.set(row.subjectKey, usedNumbers);
    }

    if (!subjectsByName.has(row.subjectKey)) {
      subjectsByName.set(row.subjectKey, { key: row.subjectKey, name: row.subjectName });
    }
    return {
      title: row.title,
      subjectKey: row.subjectKey,
      youtubeLink: row.youtubeLink,
      date: new Date(`${row.date}T00:00:00.000Z`),
      lectureNumber
    };
  });

  return { subjects: [...subjectsByName.values()], lectures };
}

async function importSchedule() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    throw new Error("Usage: node scripts/importSchedule.js <path-to-schedule.csv>");
  }

  const filePath = path.resolve(process.cwd(), csvPath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const schedule = parseSchedule(filePath);
  console.log(`Validated ${schedule.lectures.length} schedule rows across ${schedule.subjects.length} subjects.`);

  if (process.argv.includes("--validate-only")) {
    console.log("Validation-only mode: database was not changed.");
    return;
  }

  await connectDB();

  const [existingSubjects, existingLectures, existingCompletions] = await Promise.all([
    Subject.countDocuments(),
    Lecture.countDocuments(),
    Completion.countDocuments()
  ]);
  console.log(
    `Current database: ${existingSubjects} subjects, ${existingLectures} lectures, ` +
    `${existingCompletions} completion records.`
  );
  console.log("Replacing completions, lectures, and subjects. User accounts and friendships are unchanged.");
  await Completion.deleteMany({});
  await Lecture.deleteMany({});
  await Subject.deleteMany({});

  const subjects = await Subject.insertMany(schedule.subjects.map(({ name }) => ({ name })));
  const subjectIds = new Map(subjects.map((subject) => [subject.name.toLocaleLowerCase(), subject._id]));
  await Lecture.insertMany(
    schedule.lectures.map((lecture) => ({
      ...lecture,
      subject: subjectIds.get(lecture.subjectKey)
    }))
  );

  console.log(`Import complete: ${subjects.length} subjects and ${schedule.lectures.length} lectures created.`);
}

importSchedule()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`Schedule import failed: ${error.message}`);
    process.exit(1);
  });
