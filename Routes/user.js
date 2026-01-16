const router = require("express").Router();
const { signup, login } = require("../Controllers/authController");
const verifyToken = require("../Middleware/verifyToken");
const User = require("../Models/User");

router.post("/signup", signup);
router.post("/login", login);

// ✅ Protected route
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Subscribe
router.post("/:id/subscribe", verifyToken, async (req, res) => {
  try {
    if (req.userId === req.params.id)
      return res.status(400).json({ message: "Cannot subscribe to yourself" });

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

// Unsubscribe
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