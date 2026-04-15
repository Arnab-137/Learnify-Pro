const express = require("express");

const {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  listFriends,
  getFriendRequests
} = require("../controllers/friendController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/search", searchUsers);
router.post("/request/:userId", sendFriendRequest);
router.post("/accept/:userId", acceptFriendRequest);
router.post("/reject/:userId", rejectFriendRequest);
router.get("/list", listFriends);
router.get("/requests", getFriendRequests);

module.exports = router;
