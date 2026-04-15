const express = require("express");
const { body } = require("express-validator");

const { signup, login, me } = require("../controllers/authController");
const protect = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must be between 2 and 80 characters."),
    body("email").trim().isEmail().withMessage("Please provide a valid email address.").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6, max: 128 })
      .withMessage("Password must be between 6 and 128 characters.")
  ],
  validate,
  signup
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please provide a valid email address.").normalizeEmail(),
    body("password").trim().notEmpty().withMessage("Password is required.")
  ],
  validate,
  login
);

router.get("/me", protect, me);

module.exports = router;
