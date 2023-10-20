const { Router } = require("express");
const router = Router();
const Likes = require("../models/iLikeIt");
const { verifyToken } = require("../middlewares/authJwt");
const { createLike } = require("../controllers/like.controllers");

router.get("/", verifyToken, async (req, res) => {
  try {
    const likes = await Likes.find();
    //console.log(likes);
    res.status(220).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let likeFound = await Likes.findById(id);
    //console.log(likeFound);
    res.status(200).json(likeFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", verifyToken, createLike);

//router.patch("/")

router.delete("/:id", verifyToken, async (req, res) => {
  const likeId = req.params.id;
  try {
    const deleteLike = await Likes.findByIdAndRemove(likeId);

    if (!deleteLike) {
      return res.status(404).json({ message: 'Likes not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
