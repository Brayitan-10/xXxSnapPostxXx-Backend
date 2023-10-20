const Story = require("../models/history");
const mongoose = require('mongoose');

const createStory = async (req, res) => {
  try {
    const { author, image, description } = req.boddy;
     
    const story = new Story({
      author: author,
      image: Buffer.from('my-image.jpg'),
      description: description,
    });

    const newStory = await story.save();
    res.status(200).json(newStory);
  } catch (error) {
    res.status(400).end()
  }
};

module.exports = { createStory }
