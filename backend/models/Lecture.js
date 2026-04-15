const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    youtubeLink: {
      type: String,
      trim: true,
      default: ""
    },
    date: {
      type: Date,
      required: true
    },
    lectureNumber: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

lectureSchema.index({ subject: 1, lectureNumber: 1 }, { unique: true });

module.exports = mongoose.model("Lecture", lectureSchema);
