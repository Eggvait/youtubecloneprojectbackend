const Comment = require("../Models/Comment");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    userId: req.userId,
  });
  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId })
    .populate("userId", "channelName profileImage")
    .sort({ createdAt: -1 });

  res.json(comments);
};
