const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendWelcomeEmail, sendLoginAlertEmail } = require("../services/emailService");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  const token = generateToken(user._id);

  sendWelcomeEmail(user).catch((error) => {
    console.error("Welcome email failed:", error.message);
  });

  res.status(201).json({
    success: true,
    message: "Signup successful.",
    data: {
      token,
      user: user.toSafeObject()
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(user._id);

  sendLoginAlertEmail(user).catch((error) => {
    console.error("Login alert email failed:", error.message);
  });

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      token,
      user: user.toSafeObject()
    }
  });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user fetched successfully.",
    data: {
      user: req.user.toSafeObject()
    }
  });
});

module.exports = {
  signup,
  login,
  me
};
