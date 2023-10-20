// follower_id(seguidor), following_id(siguiendo a )
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    following_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema)

module.exports = Follow;
