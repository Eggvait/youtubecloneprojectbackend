const Video = require("../Models/Video");

exports.uploadVideo = async (req, res) => {
  const video = await Video.create({
    ...req.body,
    userId: req.userId,
  });
  res.status(201).json(video);
};

exports.getAllVideos = async (req, res) => {
  const videos = await Video.find()
    .populate("userId", "channelName profileImage")
    .sort({ createdAt: -1 });
  res.json(videos);
};

exports.getVideo = async (req, res) => {
  const video = await Video.findById(req.params.id).populate(
    "userId",
    "channelName profileImage subscribers"
  );
  res.json(video);
};

exports.likeVideo = async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $addToSet: { likes: req.userId },
    $pull: { dislikes: req.userId },
  });
  res.json({ message: "Liked" });
};

exports.dislikeVideo = async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $addToSet: { dislikes: req.userId },
      $pull: { likes: req.userId },
    });

    res.json({ message: "Disliked" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

