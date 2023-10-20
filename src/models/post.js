const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    title: String,
    description: String,
    image: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema)

module.exports = Post;
