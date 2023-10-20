const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const { createUser } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authJwt");

router.get("/", verifyToken, async (req, res) => {
  try {
      const users = await User.find();
      //console.log(users);
      res.status(220).json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken,  async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let userFound = await User.findById(id);
    //console.log(userFound);
    res.status(200).json(userFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", createUser);

router.patch("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  const userFields = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(userId, userFields, { new: true });

    if (!updateUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndRemove(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
