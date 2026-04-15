const Completion = require("../models/Completion");
const Lecture = require("../models/Lecture");
const Subject = require("../models/Subject");
const asyncHandler = require("../utils/asyncHandler");
const { buildCompletionSummary } = require("./completionController");
const { buildChartConfig, buildQuickChartUrl } = require("../services/quickChartService");
const { getDailyQuote } = require("../services/quoteService");
const { getStudySuggestions } = require("../services/aiSuggestionService");
const {
  dayjs,
  formatDateKey,
  startOfDay,
  startOfWeek,
  addDays,
  subtractDays
} = require("../utils/dateTime");

async function getNextLecture(userId) {
  const completedDocs = await Completion.find({ user: userId, completed: true }).select("lecture");
  const completedLectureIds = completedDocs.map((item) => item.lecture);

  return Lecture.findOne({
    _id: { $nin: completedLectureIds }
  })
    .populate("subject", "name")
    .sort({ date: 1, lectureNumber: 1 });
}

function clampRange(value, fallback, max) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, max);
}

const getDailyProgress = asyncHandler(async (req, res) => {
  const days = clampRange(req.query.days, 14, 60);
  const startDate = startOfDay(subtractDays(new Date(), days - 1));

  const completions = await Completion.find({
    user: req.user._id,
    completed: true,
    completedAt: { $gte: startDate }
  }).select("completedAt");

  const counts = new Map();
  completions.forEach((item) => {
    const key = formatDateKey(item.completedAt);
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  const data = Array.from({ length: days }, (_, index) => {
    const date = addDays(startDate, index);
    const key = formatDateKey(date);
    return {
      date: key,
      completedLectures: counts.get(key) || 0
    };
  });

  const chartConfig = buildChartConfig({
    type: "line",
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Daily completions",
        data: data.map((item) => item.completedLectures),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.18)",
        fill: true,
        tension: 0.35
      }
    ]
  });

  res.status(200).json({
    success: true,
    message: "Daily progress fetched successfully.",
    data: {
      rangeDays: days,
      points: data,
      chartUrl: buildQuickChartUrl(chartConfig)
    }
  });
});

const getWeeklyCompletionStats = asyncHandler(async (req, res) => {
  const weeks = clampRange(req.query.weeks, 8, 16);
  const firstWeekStart = startOfWeek(subtractDays(new Date(), (weeks - 1) * 7));

  const completions = await Completion.find({
    user: req.user._id,
    completed: true,
    completedAt: { $gte: firstWeekStart }
  }).select("completedAt");

  const counts = new Map();
  completions.forEach((item) => {
    const key = formatDateKey(startOfWeek(item.completedAt));
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  const data = Array.from({ length: weeks }, (_, index) => {
    const date = addDays(firstWeekStart, index * 7);
    const weekKey = formatDateKey(startOfWeek(date));
    return {
      week: weekKey,
      completedLectures: counts.get(weekKey) || 0
    };
  });

  const chartConfig = buildChartConfig({
    type: "bar",
    labels: data.map((item) => item.week),
    datasets: [
      {
        label: "Weekly completions",
        data: data.map((item) => item.completedLectures),
        backgroundColor: "#10b981"
      }
    ]
  });

  res.status(200).json({
    success: true,
    message: "Weekly completion stats fetched successfully.",
    data: {
      rangeWeeks: weeks,
      points: data,
      chartUrl: buildQuickChartUrl(chartConfig)
    }
  });
});

const getSubjectAnalytics = asyncHandler(async (req, res) => {
  const summary = await buildCompletionSummary(req.user._id);

  const chartConfig = buildChartConfig({
    type: "bar",
    labels: summary.subjectWiseProgress.map((item) => item.subjectName),
    datasets: [
      {
        label: "Subject progress %",
        data: summary.subjectWiseProgress.map((item) => item.progressPercentage),
        backgroundColor: "#f59e0b"
      }
    ]
  });

  res.status(200).json({
    success: true,
    message: "Subject analytics fetched successfully.",
    data: {
      subjects: summary.subjectWiseProgress,
      chartUrl: buildQuickChartUrl(chartConfig)
    }
  });
});

const getMotivationQuote = asyncHandler(async (req, res) => {
  const quote = await getDailyQuote();

  res.status(200).json({
    success: true,
    message: "Motivational quote fetched successfully.",
    data: quote
  });
});

const getStudyInsights = asyncHandler(async (req, res) => {
  const [summary, nextLecture, quote] = await Promise.all([
    buildCompletionSummary(req.user._id),
    getNextLecture(req.user._id),
    getDailyQuote()
  ]);

  const lowestSubject = [...summary.subjectWiseProgress]
    .filter((item) => item.totalLectures > 0)
    .sort((a, b) => a.progressPercentage - b.progressPercentage)[0] || null;

  const suggestions = await getStudySuggestions({
    summary,
    nextLecture,
    lowestSubject
  });

  res.status(200).json({
    success: true,
    message: "Study insights fetched successfully.",
    data: {
      quote,
      suggestions,
      nextLecture: nextLecture
        ? {
            id: nextLecture._id,
            title: nextLecture.title,
            date: nextLecture.date,
            lectureNumber: nextLecture.lectureNumber,
            youtubeLink: nextLecture.youtubeLink,
            subject: nextLecture.subject
              ? {
                  id: nextLecture.subject._id,
                  name: nextLecture.subject.name
                }
              : null
          }
        : null
    }
  });
});

const getAnalyticsOverview = asyncHandler(async (req, res) => {
  const [summary, totalSubjects] = await Promise.all([
    buildCompletionSummary(req.user._id),
    Subject.countDocuments()
  ]);

  const todayStart = startOfDay(new Date());
  const tomorrowStart = addDays(todayStart, 1);
  const weekStart = startOfWeek(new Date());
  const nextWeekStart = addDays(weekStart, 7);

  const [todayCompleted, weekCompleted] = await Promise.all([
    Completion.countDocuments({
      user: req.user._id,
      completed: true,
      completedAt: { $gte: todayStart, $lt: tomorrowStart }
    }),
    Completion.countDocuments({
      user: req.user._id,
      completed: true,
      completedAt: { $gte: weekStart, $lt: nextWeekStart }
    })
  ]);

  res.status(200).json({
    success: true,
    message: "Analytics overview fetched successfully.",
    data: {
      totalSubjects,
      todayCompleted,
      weekCompleted,
      summary
    }
  });
});

module.exports = {
  getDailyProgress,
  getWeeklyCompletionStats,
  getSubjectAnalytics,
  getMotivationQuote,
  getStudyInsights,
  getAnalyticsOverview
};
