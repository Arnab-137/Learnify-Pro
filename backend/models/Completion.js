const mongoose = require("mongoose");

const completionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true
    },
    completed: {
      type: Boolean,
      default: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

completionSchema.index({ user: 1, lecture: 1 }, { unique: true });

module.exports = mongoose.model("Completion", completionSchema);
