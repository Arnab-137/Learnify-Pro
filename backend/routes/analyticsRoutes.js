const express = require("express");

const {
  getDailyProgress,
  getWeeklyCompletionStats,
  getSubjectAnalytics,
  getMotivationQuote,
  getStudyInsights,
  getAnalyticsOverview
} = require("../controllers/analyticsController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/overview", getAnalyticsOverview);
router.get("/daily", getDailyProgress);
router.get("/weekly", getWeeklyCompletionStats);
router.get("/subjects", getSubjectAnalytics);
router.get("/quote", getMotivationQuote);
router.get("/insights", getStudyInsights);

module.exports = router;
