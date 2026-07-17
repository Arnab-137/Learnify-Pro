const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { isAllowedOrigin } = require("./config/cors");

const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const completionRoutes = require("./routes/completionRoutes");
const friendRoutes = require("./routes/friendRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const authRateLimitMax = Number(process.env.AUTH_RATE_LIMIT_MAX || 0);
const authLimiter = authRateLimitMax > 0
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: authRateLimitMax,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: "Too many authentication attempts. Please wait a few minutes and try again."
      }
    })
  : null;

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy",
    data: {
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development"
    }
  });
});

if (authLimiter) {
  app.use("/api/auth", authLimiter, authRoutes);
} else {
  app.use("/api/auth", authRoutes);
}
app.use("/api/subjects", subjectRoutes);
app.use("/api/completions", completionRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
