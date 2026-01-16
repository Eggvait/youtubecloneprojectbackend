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

module.exports = router;