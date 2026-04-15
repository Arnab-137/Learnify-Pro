const User = require("../models/User");
const Completion = require("../models/Completion");
const Lecture = require("../models/Lecture");
const asyncHandler = require("../utils/asyncHandler");
const { getCurrentStreak } = require("../utils/streak");
const cacheService = require("../services/cacheService");

async function buildLeaderboard(userIds) {
  const normalizedIds = [...new Set(userIds.map((id) => String(id)))].sort();
  const cacheKey = `leaderboard:${normalizedIds.join(",")}`;
  const cached = cacheService.get(cacheKey);

  if (cached) {
    return cached;
  }

  const [totalLectures, users, completions] = await Promise.all([
    Lecture.countDocuments(),
    User.find({ _id: { $in: normalizedIds } }).select("name email createdAt"),
    Completion.find({
      user: { $in: normalizedIds },
      completed: true
    }).sort({ completedAt: 1 })
  ]);

  const completionsByUser = new Map();
  completions.forEach((completion) => {
    const key = String(completion.user);
    if (!completionsByUser.has(key)) {
      completionsByUser.set(key, []);
    }
    completionsByUser.get(key).push(completion);
  });

  const entries = users.map((user) => {
    const userCompletions = completionsByUser.get(String(user._id)) || [];
    const completedLectures = userCompletions.length;
    const progressPercentage = totalLectures
      ? Number(((completedLectures / totalLectures) * 100).toFixed(2))
      : 0;
    const earliestCompletionAt = userCompletions[0]?.completedAt || user.createdAt;

    return {
      userId: user._id,
      name: user.name,
      completedLectures,
      totalLectures,
      progressPercentage,
      streak: getCurrentStreak(userCompletions),
      earliestCompletionAt
    };
  });

  entries.sort((a, b) =>
    b.progressPercentage - a.progressPercentage ||
    b.completedLectures - a.completedLectures ||
    new Date(a.earliestCompletionAt) - new Date(b.earliestCompletionAt) ||
    a.name.localeCompare(b.name)
  );

  const leaderboard = entries.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId,
    name: entry.name,
    completedLectures: entry.completedLectures,
    totalLectures: entry.totalLectures,
    progressPercentage: entry.progressPercentage,
    streak: entry.streak
  }));

  cacheService.set(cacheKey, leaderboard, 60 * 1000);
  return leaderboard;
}

const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find().select("_id");
  const data = await buildLeaderboard(users.map((user) => user._id));

  res.status(200).json({
    success: true,
    message: "Global leaderboard fetched successfully.",
    data
  });
});

const getFriendsLeaderboard = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("friends");
  const userIds = [req.user._id, ...currentUser.friends];
  const data = await buildLeaderboard(userIds);

  res.status(200).json({
    success: true,
    message: "Friends leaderboard fetched successfully.",
    data
  });
});

module.exports = {
  getGlobalLeaderboard,
  getFriendsLeaderboard
};
