const { Router } = require("express");
const router = Router();
const Comment = require("../models/comment");
const { verifyToken } = require("../middlewares/authJwt");
const { createComment } = require("../controllers/comment.controllers");

router.get("/", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.find();
    //console.log(comment);
    res.status(220).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let commentFound = await Comment.findById(id);
    //console.log(commentFound);
    res.status(200).json(commentFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", verifyToken, createComment);

router.delete("/:id", verifyToken, async (req, res) => {
  const commentId = req.params.id;
  try {
    const deleteComment = await Comment.findByIdAndRemove(commentId);

    if (!deleteComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
