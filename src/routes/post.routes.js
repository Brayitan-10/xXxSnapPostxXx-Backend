const { Router } = require("express");
const router = Router();
const Post = require("../models/post");
const { verifyToken } = require("../middlewares/authJwt");
const { createPost } = require("../controllers/post.controllers");

router.get("/", verifyToken, async (req, res) => {
  try {
    const post = await Post.find();
    //console.log(post);
    res.status(220).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let postFound = await Post.findById(id);
    //console.log(postFound);
    res.status(200).json(postFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", verifyToken, createPost);

router.patch("/:id", verifyToken, async (req, res) => {
  const postId = req.params.id;
  const postFields = req.body;

  try {
    const updatePost = await Post.findByIdAndUpdate(postId, postFields, { new: true });

    if (!updatePost) {
      return res.status(400).json({ message: 'Post not found' });
    }

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const postId = req.params.id;
  try {
    const deletePost = await Post.findByIdAndRemove(postId);

    if (!deletePost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
