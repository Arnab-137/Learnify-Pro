const mongoose = require("mongoose");

const Completion = require("../models/Completion");
const Lecture = require("../models/Lecture");
const Subject = require("../models/Subject");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { getCurrentStreak } = require("../utils/streak");

async function buildCompletionSummary(userId) {
  const [totalLectures, completionDocs, subjects, lectures] = await Promise.all([
    Lecture.countDocuments(),
    Completion.find({ user: userId, completed: true })
      .populate({
        path: "lecture",
        populate: {
          path: "subject",
          model: "Subject",
          select: "name"
        }
      })
      .sort({ completedAt: -1 }),
    Subject.find().sort({ name: 1 }),
    Lecture.find().select("subject")
  ]);

  const completedLectures = completionDocs.length;
  const remainingLectures = Math.max(totalLectures - completedLectures, 0);
  const progressPercentage = totalLectures
    ? Number(((completedLectures / totalLectures) * 100).toFixed(2))
    : 0;

  const totalBySubject = new Map();
  lectures.forEach((lecture) => {
    const key = String(lecture.subject);
    totalBySubject.set(key, (totalBySubject.get(key) || 0) + 1);
  });

  const completedBySubject = new Map();
  completionDocs.forEach((item) => {
    if (item.lecture?.subject?._id) {
      const key = String(item.lecture.subject._id);
      completedBySubject.set(key, (completedBySubject.get(key) || 0) + 1);
    }
  });

  return {
    totalLectures,
    completedLectures,
    remainingLectures,
    progressPercentage,
    streak: getCurrentStreak(completionDocs),
    subjectWiseProgress: subjects.map((subject) => {
      const total = totalBySubject.get(String(subject._id)) || 0;
      const completed = completedBySubject.get(String(subject._id)) || 0;
      return {
        subjectId: subject._id,
        subjectName: subject.name,
        totalLectures: total,
        completedLectures: completed,
        progressPercentage: total ? Number(((completed / total) * 100).toFixed(2)) : 0
      };
    }),
    recentCompletions: completionDocs.slice(0, 10).map((item) => ({
      id: item._id,
      completedAt: item.completedAt,
      lecture: item.lecture
        ? {
            id: item.lecture._id,
            title: item.lecture.title,
            lectureNumber: item.lecture.lectureNumber,
            date: item.lecture.date,
            subject: item.lecture.subject
              ? {
                  id: item.lecture.subject._id,
                  name: item.lecture.subject.name
                }
              : null
          }
        : null
    }))
  };
}

const toggleCompletion = asyncHandler(async (req, res) => {
  const { lectureId, completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(lectureId)) {
    throw new ApiError(400, "Invalid lecture id.");
  }

  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    throw new ApiError(404, "Lecture not found.");
  }

  const desiredCompleted = typeof completed === "boolean" ? completed : true;

  const completion = await Completion.findOneAndUpdate(
    { user: req.user._id, lecture: lectureId },
    {
      $set: {
        completed: desiredCompleted,
        completedAt: desiredCompleted ? new Date() : null
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );

  res.status(200).json({
    success: true,
    message: desiredCompleted ? "Lecture marked complete." : "Lecture marked incomplete.",
    data: {
      completion: {
        id: completion._id,
        lecture: completion.lecture,
        completed: completion.completed,
        completedAt: completion.completedAt
      }
    }
  });
});

const getCompletionSummary = asyncHandler(async (req, res) => {
  const summary = await buildCompletionSummary(req.user._id);

  res.status(200).json({
    success: true,
    message: "Completion summary fetched successfully.",
    data: summary
  });
});

const getRecentCompletions = asyncHandler(async (req, res) => {
  const recent = await Completion.find({
    user: req.user._id,
    completed: true
  })
    .populate({
      path: "lecture",
      populate: {
        path: "subject",
        model: "Subject",
        select: "name"
      }
    })
    .sort({ completedAt: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    message: "Recent completions fetched successfully.",
    data: recent.map((item) => ({
      id: item._id,
      completedAt: item.completedAt,
      lecture: item.lecture
        ? {
            id: item.lecture._id,
            title: item.lecture.title,
            lectureNumber: item.lecture.lectureNumber,
            date: item.lecture.date,
            subject: item.lecture.subject
              ? {
                  id: item.lecture.subject._id,
                  name: item.lecture.subject.name
                }
              : null
          }
        : null
    }))
  });
});

module.exports = {
  toggleCompletion,
  getCompletionSummary,
  getRecentCompletions,
  buildCompletionSummary
};
