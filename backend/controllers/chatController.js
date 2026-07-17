const mongoose = require("mongoose");

const Message = require("../models/Message");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { formatChatMessage } = require("../utils/chatMessage");

function getLimit(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? Math.min(Math.max(parsed, 1), 100) : 50;
}

function getBeforeFilter(value) {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, "Invalid before timestamp.");
  }
  return { $lt: date };
}

function isFriend(user, friendId) {
  return user.friends.some((id) => String(id) === String(friendId));
}

async function fetchMessages(filter, limit) {
  const messages = await Message.find(filter)
    .populate("sender", "name email")
    .sort({ createdAt: -1 })
    .limit(limit);

  return messages.reverse().map(formatChatMessage);
}

const getGlobalMessages = asyncHandler(async (req, res) => {
  const filter = {
    channel: "global",
    hiddenFor: { $ne: req.user._id }
  };
  const before = getBeforeFilter(req.query.before);
  if (before) {
    filter.createdAt = before;
  }

  const messages = await fetchMessages(filter, getLimit(req.query.limit));
  res.status(200).json({
    success: true,
    message: "Global messages fetched successfully.",
    data: messages
  });
});

const getDirectMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid friend id.");
  }
  if (!isFriend(req.user, userId)) {
    throw new ApiError(403, "Direct chat is available only between friends.");
  }

  const friendExists = await User.exists({ _id: userId });
  if (!friendExists) {
    throw new ApiError(404, "Friend not found.");
  }

  const filter = {
    channel: "direct",
    hiddenFor: { $ne: req.user._id },
    $or: [
      { sender: req.user._id, recipient: userId },
      { sender: userId, recipient: req.user._id }
    ]
  };
  const before = getBeforeFilter(req.query.before);
  if (before) {
    filter.createdAt = before;
  }

  const messages = await fetchMessages(filter, getLimit(req.query.limit));
  res.status(200).json({
    success: true,
    message: "Direct messages fetched successfully.",
    data: messages
  });
});

const markDirectMessagesRead = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid friend id.");
  }
  if (!isFriend(req.user, userId)) {
    throw new ApiError(403, "Direct chat is available only between friends.");
  }

  const readAt = new Date();
  const result = await Message.updateMany(
    {
      channel: "direct",
      sender: userId,
      recipient: req.user._id,
      readAt: null
    },
    { $set: { readAt } }
  );

  res.status(200).json({
    success: true,
    message: "Messages marked as read.",
    data: { updatedCount: result.modifiedCount, readAt }
  });
});

module.exports = {
  getGlobalMessages,
  getDirectMessages,
  markDirectMessagesRead
};
