const express = require("express");
const { body } = require("express-validator");

const { createSubject, createLecture } = require("../controllers/adminController");
const requireAdminKey = require("../middleware/admin");
const validate = require("../middleware/validate");

const router = express.Router();

router.use(requireAdminKey);

router.post(
  "/subjects",
  [body("name").trim().notEmpty().withMessage("Subject name is required.")],
  validate,
  createSubject
);

router.post(
  "/lectures",
  [
    body("title").trim().notEmpty().withMessage("Lecture title is required."),
    body("subject").trim().notEmpty().withMessage("Subject id is required."),
    body("youtubeLink").optional().trim(),
    body("date").isISO8601().withMessage("A valid lecture date is required."),
    body("lectureNumber").isInt({ min: 1 }).withMessage("lectureNumber must be a positive integer.")
  ],
  validate,
  createLecture
);

module.exports = router;
