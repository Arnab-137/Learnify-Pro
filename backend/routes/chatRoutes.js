const express = require("express");

const {
  getGlobalMessages,
  getDirectMessages,
  markDirectMessagesRead
} = require("../controllers/chatController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.get("/global", getGlobalMessages);
router.get("/direct/:userId", getDirectMessages);
router.post("/direct/:userId/read", markDirectMessagesRead);

module.exports = router;
