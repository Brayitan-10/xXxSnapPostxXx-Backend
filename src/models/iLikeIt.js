// postId, userId
const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    postId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likesSchema)

module.exports = Like;
