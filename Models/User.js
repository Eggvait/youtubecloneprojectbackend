const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    channelName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    about: { type: String },
    profileImage: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
