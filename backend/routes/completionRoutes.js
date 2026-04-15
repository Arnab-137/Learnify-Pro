const express = require("express");
const { body } = require("express-validator");

const {
  toggleCompletion,
  getCompletionSummary,
  getRecentCompletions
} = require("../controllers/completionController");
const protect = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.use(protect);

router.post(
  "/toggle",
  [
    body("lectureId").trim().notEmpty().withMessage("lectureId is required."),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("completed must be a boolean value.")
  ],
  validate,
  toggleCompletion
);

router.get("/summary", getCompletionSummary);
router.get("/recent", getRecentCompletions);

module.exports = router;
