const mongoose = require("mongoose");

const Subject = require("../models/Subject");
const Lecture = require("../models/Lecture");
const Completion = require("../models/Completion");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { fetchYouTubeMetadata } = require("../services/youtubeService");
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

  const lectureWithMedia = await Promise.all(
    lectures.map(async (lecture) => ({
      lecture,
      media: await fetchYouTubeMetadata(lecture.youtubeLink)
    }))
  );

  const data = lectureWithMedia.map(({ lecture, media }) => {
    const completion = completionMap.get(String(lecture._id));
    return {
      id: lecture._id,
      title: lecture.title,
      subject: {
        id: lecture.subject._id,
        name: lecture.subject.name
      },
      youtubeLink: lecture.youtubeLink,
      videoTitle: media.title,
      thumbnailUrl: media.thumbnailUrl,
      videoId: media.videoId,
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

module.exports = {
  getSubjects,
  getLecturesBySubject
};
