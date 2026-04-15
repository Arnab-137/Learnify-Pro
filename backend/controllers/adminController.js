const Subject = require("../models/Subject");
const Lecture = require("../models/Lecture");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const createSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const existing = await Subject.findOne({ name });
  if (existing) {
    throw new ApiError(409, "Subject with this name already exists.");
  }

  const subject = await Subject.create({ name });

  res.status(201).json({
    success: true,
    message: "Subject created successfully.",
    data: subject
  });
});

const createLecture = asyncHandler(async (req, res) => {
  const { title, subject, youtubeLink, date, lectureNumber } = req.body;

  const subjectExists = await Subject.findById(subject);
  if (!subjectExists) {
    throw new ApiError(404, "Subject not found.");
  }

  const lecture = await Lecture.create({
    title,
    subject,
    youtubeLink,
    date,
    lectureNumber
  });

  res.status(201).json({
    success: true,
    message: "Lecture created successfully.",
    data: lecture
  });
});

module.exports = {
  createSubject,
  createLecture
};
