const mongoose = require("mongoose");

const Subject = require("../models/Subject");
const Lecture = require("../models/Lecture");
const Completion = require("../models/Completion");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { startOfDay, addDays } = require("../utils/dateTime");
const escapeRegex = require("../utils/escapeRegex");

const getSubjects = asyncHandler(async (req, res) => {
  const [subjects, lectureCounts, completionCounts, lastCompletions] = await Promise.all([
    Subject.find().sort({ name: 1 }),
    Lecture.aggregate([
      { $group: { _id: "$subject", totalLectures: { $sum: 1 } } }
    ]),
    Completion.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user._id), completed: true } },
      {
        $lookup: {
          from: "lectures",
          localField: "lecture",
          foreignField: "_id",
          as: "lecture"
        }
      },
      { $unwind: "$lecture" },
      {
        $group: {
          _id: "$lecture.subject",
          completedLectures: { $sum: 1 }
        }
      }
    ]),
    Completion.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user._id), completed: true } },
      {
        $lookup: {
          from: "lectures",
          localField: "lecture",
          foreignField: "_id",
          as: "lecture"
        }
      },
      { $unwind: "$lecture" },
      {
        $group: {
          _id: "$lecture.subject",
          lastStudiedAt: { $max: "$completedAt" }
        }
      }
    ])
  ]);

  const lectureMap = new Map(lectureCounts.map((item) => [String(item._id), item.totalLectures]));
  const completionMap = new Map(completionCounts.map((item) => [String(item._id), item.completedLectures]));
  const lastStudiedMap = new Map(lastCompletions.map((item) => [String(item._id), item.lastStudiedAt]));

  const data = subjects.map((subject) => {
    const totalLectures = lectureMap.get(String(subject._id)) || 0;
    const completedLectures = completionMap.get(String(subject._id)) || 0;
    const progressPercentage = totalLectures
      ? Number(((completedLectures / totalLectures) * 100).toFixed(2))
      : 0;

    return {
      id: subject._id,
      name: subject.name,
      totalLectures,
      completedLectures,
      progressPercentage,
      lastStudiedAt: lastStudiedMap.get(String(subject._id)) || null,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    };
  });

  res.status(200).json({
    success: true,
    message: "Subjects fetched successfully.",
    data
  });
});

const getLecturesBySubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
    throw new ApiError(400, "Invalid subject id.");
  }

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new ApiError(404, "Subject not found.");
  }

  const lectureFilter = { subject: subjectId };
  if (req.query.date) {
    const date = startOfDay(req.query.date);
    if (Number.isNaN(date.getTime())) {
      throw new ApiError(400, "Invalid date filter.");
    }

    const nextDate = addDays(date, 1);
    lectureFilter.date = { $gte: date, $lt: nextDate };
  }

  if (req.query.search) {
    lectureFilter.title = { $regex: escapeRegex(req.query.search.trim()), $options: "i" };
  }

  const lectures = await Lecture.find(lectureFilter)
    .populate("subject", "name")
    .sort({ date: 1, lectureNumber: 1 });

  const completionDocs = await Completion.find({
    user: req.user._id,
    lecture: { $in: lectures.map((lecture) => lecture._id) }
  }).lean();

  const completionMap = new Map(
    completionDocs.map((item) => [String(item.lecture), item])
  );

  const data = lectures.map((lecture) => {
    const completion = completionMap.get(String(lecture._id));
    return {
      id: lecture._id,
      title: lecture.title,
      subject: {
        id: lecture.subject._id,
        name: lecture.subject.name
      },
      youtubeLink: lecture.youtubeLink,
      date: lecture.date,
      lectureNumber: lecture.lectureNumber,
      isCompleted: Boolean(completion?.completed),
      completedAt: completion?.completedAt || null
    };
  });

  res.status(200).json({
    success: true,
    message: "Lectures fetched successfully.",
    data: {
      subject: {
        id: subject._id,
        name: subject.name
      },
      lectures: data
    }
  });
});

const getStudyBundle = asyncHandler(async (req, res) => {
  const [subjects, lectures, completionDocs] = await Promise.all([
    Subject.find().sort({ name: 1 }).lean(),
    Lecture.find().sort({ date: 1, lectureNumber: 1 }).lean(),
    Completion.find({ user: req.user._id, completed: true }).lean()
  ]);

  const subjectMap = new Map(
    subjects.map((subject) => [
      String(subject._id),
      {
        id: subject._id,
        name: subject.name
      }
    ])
  );

  const lectureMap = new Map();
  const totalBySubject = new Map();

  lectures.forEach((lecture) => {
    lectureMap.set(String(lecture._id), lecture);
    const subjectKey = String(lecture.subject);
    totalBySubject.set(subjectKey, (totalBySubject.get(subjectKey) || 0) + 1);
  });

  const completedBySubject = new Map();
  const lastStudiedBySubject = new Map();
  const completionMap = new Map();

  completionDocs.forEach((completion) => {
    completionMap.set(String(completion.lecture), completion);
    const lecture = lectureMap.get(String(completion.lecture));
    if (!lecture) {
      return;
    }

    const subjectKey = String(lecture.subject);
    completedBySubject.set(subjectKey, (completedBySubject.get(subjectKey) || 0) + 1);

    const previousDate = lastStudiedBySubject.get(subjectKey);
    if (!previousDate || new Date(completion.completedAt) > new Date(previousDate)) {
      lastStudiedBySubject.set(subjectKey, completion.completedAt);
    }
  });

  const subjectData = subjects.map((subject) => {
    const subjectKey = String(subject._id);
    const totalLectures = totalBySubject.get(subjectKey) || 0;
    const completedLectures = completedBySubject.get(subjectKey) || 0;
    return {
      id: subject._id,
      name: subject.name,
      totalLectures,
      completedLectures,
      progressPercentage: totalLectures
        ? Number(((completedLectures / totalLectures) * 100).toFixed(2))
        : 0,
      lastStudiedAt: lastStudiedBySubject.get(subjectKey) || null,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    };
  });

  const lectureData = lectures.map((lecture) => {
    const completion = completionMap.get(String(lecture._id));
    return {
      id: lecture._id,
      title: lecture.title,
      subject: subjectMap.get(String(lecture.subject)) || null,
      youtubeLink: lecture.youtubeLink,
      date: lecture.date,
      lectureNumber: lecture.lectureNumber,
      isCompleted: Boolean(completion?.completed),
      completedAt: completion?.completedAt || null
    };
  });

  res.status(200).json({
    success: true,
    message: "Study data fetched successfully.",
    data: {
      subjects: subjectData,
      lectures: lectureData
    }
  });
});

module.exports = {
  getSubjects,
  getLecturesBySubject,
  getStudyBundle
};
