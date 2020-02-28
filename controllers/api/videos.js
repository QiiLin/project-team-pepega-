const express = require("express");
const router = express.Router();

// Bring in Video model
const Video = require("../../models/Video");

// @route GET api/videos/
// @desc get all videos
// @access Public
router.get("/", (req, res) => {
  Video.find()
    .sort({ date: -1 })
    .then(videos => res.json(videos));
});

// @route POST api/videos/
// @desc create a Video
// @access Public
router.post("/", (req, res) => {
  const newVideo = new Video({
    name: req.body.name
  });
  newVideo.save().then(video => res.json(video));
});

// @route DELETE api/videos/
// @desc delete a Video
// @access Public
router.delete("/:id", (req, res) => {
  Video.findById(req.params.id).then(video =>
    video
      .remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }))
  );
});

module.exports = router;
