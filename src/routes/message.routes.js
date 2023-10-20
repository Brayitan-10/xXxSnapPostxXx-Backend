const { Router } = require("express");
const router = Router();
const Message = require("../models/message");
const { verifyToken } = require("../middlewares/authJwt");
const { createMessage } = require("../controllers/message.controllers");

router.get("/", verifyToken, async (req, res) => {
  try {
    const message = await Message.find();
    //console.log(message);
    res.status(220).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let messageFound = await Message.findById(id);
    //console.log(messageFound);
    res.status(200).json(messageFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", verifyToken, createMessage);

/*router.patch("/:id", verifyToken, async (req, res) => {
  const messageId = req.params.id;
  const messageFields = req.body;

  try {
    const updateMessage = await Message.findByIdAndUpdate(messageId, messageFields, { new: true });

    if (!updateMessage) {
      return res.status(400).json({ message: 'Message not found' });
    }

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
});*/

router.delete("/:id", verifyToken, async (req, res) => {
  const messageId = req.params.id;
  try {
    const deleteMessage = await Message.findByIdAndRemove(messageId);

    if (!deleteMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
