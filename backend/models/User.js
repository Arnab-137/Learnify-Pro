const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { getAvatarUrl } = require("../services/avatarService");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ],
    friendRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ],
    friendRequestsReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function handlePasswordHash(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.index({ name: 1 });

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatarUrl: getAvatarUrl(this.name || this.email),
    friends: this.friends,
    friendRequestsSent: this.friendRequestsSent,
    friendRequestsReceived: this.friendRequestsReceived,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model("User", userSchema);
