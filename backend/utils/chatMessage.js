const { getAvatarUrl } = require("../services/avatarService");

function normalizeMessageBody(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function formatChatMessage(message) {
  const sender = message.sender || {};
  return {
    id: message._id,
    channel: message.channel,
    body: message.body,
    sender: {
      id: sender._id,
      name: sender.name || "Learner",
      avatarUrl: getAvatarUrl(sender.name || sender.email || "Learner")
    },
    recipientId: message.recipient || null,
    readAt: message.readAt || null,
    createdAt: message.createdAt
  };
}

module.exports = {
  normalizeMessageBody,
  formatChatMessage
};
