const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    views: { type: Number, default: 0 },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
