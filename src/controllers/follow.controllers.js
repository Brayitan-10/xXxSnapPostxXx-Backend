const Follow = require("../models/follow");

const createFollow = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;

    const follow = new Follow({
      follower_id: follower_id,
      following_id: following_id,
    });

    const newFollow = await follow.save();
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = { createFollow }
