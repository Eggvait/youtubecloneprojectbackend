const router = require("express").Router();
const { signup, login } = require("../Controllers/authController");
const verifyToken = require("../Middleware/verifyToken");
const User = require("../Models/User");

router.post("/signup", signup);
router.post("/login", login);

// ✅ Get current user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("subscribedUsers", "_id channelName profileImage");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Subscribe
router.post("/:id/subscribe", verifyToken, async (req, res) => {
  try {
    if (req.userId === req.params.id) {
      return res.status(400).json({ message: "Cannot subscribe to yourself" });
    }

    const alreadySubscribed = await User.findOne({
      _id: req.userId,
      subscribedUsers: req.params.id,
    });

    if (alreadySubscribed) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { subscribedUsers: req.params.id },
    });

    res.json({ message: "Subscribed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Unsubscribe
router.post("/:id/unsubscribe", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    await User.findByIdAndUpdate(req.userId, {
      $pull: { subscribedUsers: req.params.id },
    });

    res.json({ message: "Unsubscribed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
