require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const connectDB = require("../config/db");
const Subject = require("../models/Subject");
const Lecture = require("../models/Lecture");
const Completion = require("../models/Completion");
const { subjects, lectures } = require("../utils/seedData");

async function seed() {
  await connectDB();

  console.log("Clearing existing subjects, lectures, and completions...");
  await Promise.all([
    Completion.deleteMany({}),
    Lecture.deleteMany({}),
    Subject.deleteMany({})
  ]);

  console.log("Creating subjects...");
  const createdSubjects = await Subject.insertMany(subjects.map((subject) => ({ name: subject.name })));
  const subjectMap = new Map(
    createdSubjects.map((subject) => {
      const original = subjects.find((item) => item.name === subject.name);
      return [original.key, subject._id];
    })
  );

  console.log("Creating lectures...");
  await Lecture.insertMany(
    lectures.map((lecture) => ({
      title: lecture.title,
      subject: subjectMap.get(lecture.subjectKey),
      youtubeLink: lecture.youtubeLink,
      date: lecture.date,
      lectureNumber: lecture.lectureNumber
    }))
  );

  console.log("Seed completed successfully.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
