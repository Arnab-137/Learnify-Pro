const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const User = require("../models/User");
const Message = require("../models/Message");
const { isAllowedOrigin } = require("../config/cors");
const { normalizeMessageBody, formatChatMessage } = require("../utils/chatMessage");

const GLOBAL_ROOM = "chat:global";
const onlineConnections = new Map();

function userRoom(userId) {
  return `chat:user:${userId}`;
}

function isFriend(user, friendId) {
  return user.friends.some((id) => String(id) === String(friendId));
}

function acknowledge(callback, payload) {
  if (typeof callback === "function") {
    callback(payload);
  }
}

function canSend(socket) {
  const now = Date.now();
  socket.data.messageTimes = (socket.data.messageTimes || []).filter((time) => now - time < 10000);
  if (socket.data.messageTimes.length >= 12) {
    return false;
  }
  socket.data.messageTimes.push(now);
  return true;
}

async function authenticateSocket(socket, next) {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Authorization token is missing."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("name email friends");
    if (!user) {
      return next(new Error("User not found for this token."));
    }
    socket.data.user = user;
    socket.data.messageTimes = [];
    return next();
  } catch (error) {
    return next(new Error("Invalid or expired token."));
  }
}

function initializeChatSocket(server) {
  const io = new Server(server, {
    cors: {
      origin(origin, callback) {
        callback(isAllowedOrigin(origin) ? null : new Error("Not allowed by CORS"), isAllowedOrigin(origin));
      },
      credentials: true
    }
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const user = socket.data.user;
    const userId = String(user._id);
    socket.join(GLOBAL_ROOM);
    socket.join(userRoom(userId));

    const connectionCount = (onlineConnections.get(userId) || 0) + 1;
    onlineConnections.set(userId, connectionCount);
    if (connectionCount === 1) {
      io.emit("presence:update", { userId, online: true });
    }
    socket.emit("presence:snapshot", { userIds: [...onlineConnections.keys()] });

    socket.on("chat:send", async (payload = {}, callback) => {
      if (!canSend(socket)) {
        return acknowledge(callback, { success: false, message: "You are sending messages too quickly." });
      }

      const body = normalizeMessageBody(payload.body);
      const channel = payload.channel === "direct" ? "direct" : "global";
      if (!body || body.length > 1000) {
        return acknowledge(callback, { success: false, message: "Messages must be between 1 and 1000 characters." });
      }

      let recipient = null;
      if (channel === "direct") {
        recipient = payload.recipientId;
        if (!mongoose.Types.ObjectId.isValid(recipient) || !isFriend(user, recipient)) {
          return acknowledge(callback, { success: false, message: "You can message accepted friends only." });
        }
      }

      try {
        const message = await Message.create({
          channel,
          sender: user._id,
          recipient: channel === "direct" ? recipient : null,
          body
        });
        await message.populate("sender", "name email");
        const data = formatChatMessage(message);

        if (channel === "global") {
          io.to(GLOBAL_ROOM).emit("chat:message", data);
        } else {
          io.to(userRoom(userId)).to(userRoom(String(recipient))).emit("chat:message", data);
        }
        return acknowledge(callback, { success: true, data });
      } catch (error) {
        return acknowledge(callback, { success: false, message: "Unable to save this message." });
      }
    });

    socket.on("chat:delete", async (payload = {}, callback) => {
      const messageId = payload.messageId;
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        return acknowledge(callback, { success: false, message: "This message could not be found." });
      }

      try {
        const message = await Message.findOneAndDelete({
          _id: messageId,
          sender: user._id
        });
        if (!message) {
          return acknowledge(callback, { success: false, message: "You can delete only your own messages." });
        }

        const data = {
          messageId: String(message._id),
          channel: message.channel,
          senderId: userId,
          recipientId: message.recipient ? String(message.recipient) : null
        };

        if (message.channel === "global") {
          io.to(GLOBAL_ROOM).emit("chat:deleted", data);
        } else {
          io.to(userRoom(userId)).to(userRoom(data.recipientId)).emit("chat:deleted", data);
        }
        return acknowledge(callback, { success: true, data });
      } catch (error) {
        return acknowledge(callback, { success: false, message: "Unable to delete this message." });
      }
    });

    socket.on("chat:typing", (payload = {}) => {
      const recipientId = payload.recipientId;
      if (!mongoose.Types.ObjectId.isValid(recipientId) || !isFriend(user, recipientId)) {
        return;
      }
      socket.to(userRoom(String(recipientId))).emit("chat:typing", {
        userId,
        typing: Boolean(payload.typing)
      });
    });

    socket.on("disconnect", () => {
      const remaining = Math.max((onlineConnections.get(userId) || 1) - 1, 0);
      if (remaining === 0) {
        onlineConnections.delete(userId);
        io.emit("presence:update", { userId, online: false });
      } else {
        onlineConnections.set(userId, remaining);
      }
    });
  });

  return io;
}

module.exports = initializeChatSocket;
