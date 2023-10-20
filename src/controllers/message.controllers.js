const Message = require("../models/message");
const bcrypt = require('bcrypt');

const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const message = new Message({
      senderId: senderId,
      receiverId: receiverId,
      content: content,
    });

    const salt = await bcrypt.genSalt(10);
    message.content = await bcrypt.hash(content, salt);

    const newMessage = await message.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = { createMessage }
