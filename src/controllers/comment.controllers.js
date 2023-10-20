const Comment = require("../models/comment");
const bcrypt = require('bcrypt');

const createComment = async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;

    const comment = new Comment({
      post_id: post_id,
      user_id: user_id,
      content: content,
    });

    const salt = await bcrypt.genSalt(10);
    comment.content = await bcrypt.hash(content, salt);

    const newComment = await comment.save();
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = { createComment }
