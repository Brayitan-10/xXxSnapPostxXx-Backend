const Like = require("../models/iLikeIt");

const createLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const like = new Like({
      postId: postId,
      userId: userId,
    });

    const newLike = await like.save();
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = { createLike }
