const express = require("express");

const { getGlobalLeaderboard, getFriendsLeaderboard } = require("../controllers/leaderboardController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/global", getGlobalLeaderboard);
router.get("/friends", getFriendsLeaderboard);

module.exports = router;
