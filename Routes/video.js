const router = require("express").Router();
const auth = require("../Middleware/auth");
const controller = require("../Controllers/videoController");

router.post("/", auth, controller.uploadVideo);
router.get("/", controller.getAllVideos);
router.get("/:id", controller.getVideo);
router.post("/:id/like", auth, controller.likeVideo);
router.post("/:id/dislike", auth, controller.dislikeVideo);
router.get("/user/:userId", controller.getUserVideos);


module.exports = router;
