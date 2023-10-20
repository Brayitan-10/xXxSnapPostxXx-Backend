const { Router } = require("express");
const router = Router();
const userRoutes = require("./user.routes");
const auth = require("./auth.routes");
const post = require("./post.routes");
const message = require("./message.routes");
const likes = require("./likes.routes");
const history = require("./history.routes");
const follow = require("./follow.routes");
const comment = require("./comment.routes");

router.use("/users", userRoutes);
router.use("/auth", auth);
router.use("/posts", post);
router.use("/message", message);
router.use("/likes", likes);
router.use("/stories", history);
router.use("/follow", follow);
router.use("/comment", comment);

module.exports = router;
