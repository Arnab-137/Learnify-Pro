const mongoose = require("mongoose");

const User = require("../models/User");
const { sendFriendRequestEmail } = require("../services/emailService");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const escapeRegex = require("../utils/escapeRegex");

const searchUsers = asyncHandler(async (req, res) => {
  const q = (req.query.q || "").trim();

  if (!q) {
    return res.status(200).json({
      success: true,
      message: "Search query is empty.",
      data: []
    });
  }

  const safeQuery = escapeRegex(q);

  const users = await User.find({
    _id: { $ne: req.user._id },
    $or: [
      { name: { $regex: safeQuery, $options: "i" } },
      { email: { $regex: safeQuery, $options: "i" } }
    ]
  })
    .select("name email friends friendRequestsSent friendRequestsReceived")
    .limit(20);

  const data = users.map((user) => {
    const isFriend = user.friends.some((friendId) => String(friendId) === String(req.user._id));
    const requestSent = user.friendRequestsReceived.some((id) => String(id) === String(req.user._id));
    const requestReceived = user.friendRequestsSent.some((id) => String(id) === String(req.user._id));

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.toSafeObject().avatarUrl,
      isFriend,
      requestSent,
      requestReceived
    };
  });

  res.status(200).json({
    success: true,
    message: "Users fetched successfully.",
    data
  });
});

const sendFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id.");
  }

  if (String(userId) === String(req.user._id)) {
    throw new ApiError(400, "You cannot send a friend request to yourself.");
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(req.user._id),
    User.findById(userId)
  ]);

  if (!targetUser) {
    throw new ApiError(404, "Target user not found.");
  }

  const isFriend = currentUser.friends.some((friendId) => String(friendId) === String(userId));
  if (isFriend) {
    throw new ApiError(400, "This user is already your friend.");
  }

  const alreadySent = currentUser.friendRequestsSent.some((id) => String(id) === String(userId));
  if (alreadySent) {
    throw new ApiError(400, "Friend request already sent.");
  }

  const hasIncomingRequest = currentUser.friendRequestsReceived.some((id) => String(id) === String(userId));
  if (hasIncomingRequest) {
    throw new ApiError(400, "This user has already sent you a request. Accept it instead.");
  }

  currentUser.friendRequestsSent.push(targetUser._id);
  targetUser.friendRequestsReceived.push(currentUser._id);

  await Promise.all([currentUser.save(), targetUser.save()]);

  sendFriendRequestEmail({ receiver: targetUser, sender: currentUser }).catch((error) => {
    console.error("Friend request email failed:", error.message);
  });

  res.status(200).json({
    success: true,
    message: "Friend request sent successfully."
  });
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id.");
  }

  const [currentUser, requester] = await Promise.all([
    User.findById(req.user._id),
    User.findById(userId)
  ]);

  if (!requester) {
    throw new ApiError(404, "Requesting user not found.");
  }

  const hasRequest = currentUser.friendRequestsReceived.some((id) => String(id) === String(userId));
  if (!hasRequest) {
    throw new ApiError(400, "No incoming friend request from this user.");
  }

  currentUser.friendRequestsReceived = currentUser.friendRequestsReceived.filter(
    (id) => String(id) !== String(userId)
  );
  requester.friendRequestsSent = requester.friendRequestsSent.filter(
    (id) => String(id) !== String(currentUser._id)
  );

  if (!currentUser.friends.some((id) => String(id) === String(userId))) {
    currentUser.friends.push(requester._id);
  }
  if (!requester.friends.some((id) => String(id) === String(currentUser._id))) {
    requester.friends.push(currentUser._id);
  }

  await Promise.all([currentUser.save(), requester.save()]);

  res.status(200).json({
    success: true,
    message: "Friend request accepted."
  });
});

const rejectFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id.");
  }

  const [currentUser, requester] = await Promise.all([
    User.findById(req.user._id),
    User.findById(userId)
  ]);

  if (!requester) {
    throw new ApiError(404, "Requesting user not found.");
  }

  currentUser.friendRequestsReceived = currentUser.friendRequestsReceived.filter(
    (id) => String(id) !== String(userId)
  );
  requester.friendRequestsSent = requester.friendRequestsSent.filter(
    (id) => String(id) !== String(currentUser._id)
  );

  await Promise.all([currentUser.save(), requester.save()]);

  res.status(200).json({
    success: true,
    message: "Friend request rejected."
  });
});

const removeFriend = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id.");
  }

  if (String(userId) === String(req.user._id)) {
    throw new ApiError(400, "You cannot remove yourself.");
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(req.user._id),
    User.findById(userId)
  ]);

  if (!targetUser) {
    throw new ApiError(404, "Friend not found.");
  }

  const wasFriend = currentUser.friends.some((id) => String(id) === String(userId));
  if (!wasFriend) {
    throw new ApiError(400, "This user is not currently in your friends list.");
  }

  currentUser.friends = currentUser.friends.filter((id) => String(id) !== String(userId));
  targetUser.friends = targetUser.friends.filter((id) => String(id) !== String(currentUser._id));

  currentUser.friendRequestsSent = currentUser.friendRequestsSent.filter((id) => String(id) !== String(userId));
  currentUser.friendRequestsReceived = currentUser.friendRequestsReceived.filter((id) => String(id) !== String(userId));
  targetUser.friendRequestsSent = targetUser.friendRequestsSent.filter((id) => String(id) !== String(currentUser._id));
  targetUser.friendRequestsReceived = targetUser.friendRequestsReceived.filter((id) => String(id) !== String(currentUser._id));

  await Promise.all([currentUser.save(), targetUser.save()]);

  res.status(200).json({
    success: true,
    message: "Friend removed successfully."
  });
});

const listFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("friends", "name email createdAt");

  res.status(200).json({
    success: true,
    message: "Friends fetched successfully.",
    data: user.friends.map((friend) => ({
      id: friend._id,
      name: friend.name,
      email: friend.email,
      avatarUrl: friend.toSafeObject().avatarUrl,
      createdAt: friend.createdAt
    }))
  });
});

const getFriendRequests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("friendRequestsSent", "name email")
    .populate("friendRequestsReceived", "name email");

  res.status(200).json({
    success: true,
    message: "Friend requests fetched successfully.",
    data: {
      sent: user.friendRequestsSent.map((friend) => ({
        id: friend._id,
        name: friend.name,
        email: friend.email,
        avatarUrl: friend.toSafeObject().avatarUrl
      })),
      received: user.friendRequestsReceived.map((friend) => ({
        id: friend._id,
        name: friend.name,
        email: friend.email,
        avatarUrl: friend.toSafeObject().avatarUrl
      }))
    }
  });
});

module.exports = {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  listFriends,
  getFriendRequests
};
