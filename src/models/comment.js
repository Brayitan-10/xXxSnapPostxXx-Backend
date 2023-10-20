// post_id, user_id, content
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    content: { type: String, required: true }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment;
