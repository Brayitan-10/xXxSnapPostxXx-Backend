const { Router } = require("express");
const router = Router();
const Follow = require("../models/follow");
const { verifyToken } = require("../middlewares/authJwt");
const { createFollow } = require("../controllers/follow.controllers");

router.get("/", verifyToken, async (req, res) => {
  try {
    const follow = await Follow.find();
    //console.log(follow);
    res.status(220).json(follow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let followFound = await Follow.findById(id);
    //console.log(followFound);
    res.status(200).json(followFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", verifyToken, createFollow);

router.delete("/:id", verifyToken, async (req, res) => {
  const followId = req.params.id;
  try {
    const deleteFollow = await Follow.findByIdAndRemove(followId);

    if (!deleteFollow) {
      return res.status(404).json({ message: 'Follow not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
