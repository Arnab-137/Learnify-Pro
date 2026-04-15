const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const completionRoutes = require("./routes/completionRoutes");
const friendRoutes = require("./routes/friendRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = (process.env.FRONTEND_URLS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isLocalDevOrigin(origin = "") {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    return true;
  }

  if (process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin)) {
    return true;
  }

  return false;
}

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

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later."
  }
});

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

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/completions", completionRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
