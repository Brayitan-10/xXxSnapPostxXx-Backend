const Post = require("../models/post");
const mongoose = require('mongoose');
//const User = require("../models/user");

const createPost = async (req, res) => {
  try {
    const { author, title, description, image } = req.body;

    const post = new Post({
      author: author,
      title: title,
      description: description,
      image: Buffer.from('my-image.jpg'),
    });

    const newPost = await post.save();
    //res.status(200).json(newPost)
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = { createPost }
