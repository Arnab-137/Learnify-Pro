const cacheService = require("./cacheService");

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function sendResendEmail({ to, subject, html }) {
  if (!isEmailConfigured()) {
    return {
      sent: false,
      skipped: true,
      reason: "Email service not configured"
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html
    })
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Resend email failed: ${payload}`);
  }

  return response.json();
}

async function sendWelcomeEmail(user) {
  return sendResendEmail({
    to: user.email,
    subject: "Welcome to Study Tracker",
    html: `
      <h2>Welcome, ${user.name}!</h2>
      <p>Your Study Tracker account is ready.</p>
      <p>Start tracking your lectures, streaks, and leaderboard progress today.</p>
    `
  });
}

async function sendLoginAlertEmail(user) {
  const cacheKey = `login-alert:${user._id}`;
  if (cacheService.get(cacheKey)) {
    return {
      sent: false,
      skipped: true,
      reason: "Login alert throttled"
    };
  }

  const result = await sendResendEmail({
    to: user.email,
    subject: "New login to your Study Tracker account",
    html: `
      <p>Hello ${user.name},</p>
      <p>Your Study Tracker account was just accessed successfully.</p>
      <p>If this was not you, please reset your password immediately.</p>
    `
  });

  cacheService.set(cacheKey, true, 15 * 60 * 1000);
  return result;
}

async function sendFriendRequestEmail({ receiver, sender }) {
  return sendResendEmail({
    to: receiver.email,
    subject: `${sender.name} sent you a friend request`,
    html: `
      <p>Hello ${receiver.name},</p>
      <p><strong>${sender.name}</strong> sent you a friend request on Study Tracker.</p>
      <p>Open your friends section to accept or reject it.</p>
    `
  });
}

async function sendDailyReminderEmail({ user, summary }) {
  return sendResendEmail({
    to: user.email,
    subject: "Your daily Study Tracker reminder",
    html: `
      <p>Hello ${user.name},</p>
      <p>You have completed ${summary.completedLectures} of ${summary.totalLectures} lectures.</p>
      <p>Your current streak is ${summary.streak} day${summary.streak === 1 ? "" : "s"}.</p>
      <p>Come back today and keep the momentum going.</p>
    `
  });
}

module.exports = {
  isEmailConfigured,
  sendWelcomeEmail,
  sendLoginAlertEmail,
  sendFriendRequestEmail,
  sendDailyReminderEmail
};
