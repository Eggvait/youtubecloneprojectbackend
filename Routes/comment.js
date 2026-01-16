const router = require("express").Router();
const auth = require("../Middleware/auth");
const controller = require("../Controllers/commentController");

router.get("/:videoId", controller.getComments);
router.post("/", auth, controller.addComment);

module.exports = router;
