const { Router } = require("express");
const router = Router();
const Story = require("../models/history");
const { verifyToken } = require("../middlewares/authJwt");
const { createStory } = require("../controllers/story.controllers");

router.get("/", verifyToken, async (req, res) => {
  try {
    const story = await Story.find();
    //console.log(story);
    res.status(220).json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    //1-Filtrar segun param de name
    let id = (req.params.id);
    let storyFound = await Story.findById(id);
    //console.log(storyFound);
    res.status(200).json(storyFound);
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
});

router.post("/", verifyToken, createStory);

router.patch("/:id", verifyToken, async (req, res) => {
  const storyId = req.params.id;
  const storyFields = req.body;

  try {
    const updateStory = await Story.findByIdAndUpdate(storyId, storyFields, { new: true });

    if (!updateStory) {
      return res.status(400).json({ message: 'Story not found' });
    }

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const storyId = req.params.id;
  try {
    const deleteStory = await Story.findByIdAndRemove(storyId);

    if (!deleteStory) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
