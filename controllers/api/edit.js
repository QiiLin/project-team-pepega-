const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// @route  POST /api/edit/merge/:id/:idSplice
// @desc   Append video from idMerge to video from id
// @access Private
router.post("/merge/:id/:idMerge", auth, (req, res) => {
  /*new ffmpeg(path.join(__dirname, "../../video_input/test2.mp4"))
  .size("640x360")
  .autopad()
  .withVideoCodec('libx264')
  .withAudioCodec('libmp3lame')
  .withFpsInput(30)
  .withVideoBitrate('650k')
  .withAudioChannels(2)
  .on('error', function(err) {
    console.log('An error occurred1: ' + err.message);
  })
  .on('stderr', function(stderrLine) {
    console.log('Stderr output: ' + stderrLine);
  })
  .save(path.join(__dirname, '../../video_output/tmp/test2_changed.mp4'));

  new ffmpeg(path.join(__dirname, "../../video_input/test1.mp4"))
  .size("640x360")
  .autopad()
  .withVideoCodec('libx264')
  .withAudioCodec('libmp3lame')
  .withFpsInput(30)
  .withVideoBitrate('650k')
  .withAudioChannels(2)  
  .on('error', function(err) {
    console.log('An error occurred2: ' + err.message);
  })
  .on('stderr', function(stderrLine) {
    console.log('Stderr output: ' + stderrLine);
  })
  .save(path.join(__dirname, '../../video_output/tmp/test1_changed.mp4'));*/
  
  new ffmpeg({ source: path.join(__dirname, "../../video_output/tmp/test1_changed.mp4") })
  .mergeAdd(path.join(__dirname, "../../video_output/tmp/test2_changed.mp4"))
  .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
  })
  .on('stderr', function(stderrLine) {
    console.log('Stderr output: ' + stderrLine);
  })
  .on('end', function() {
      console.log('Merging finished !');
  })
  //.save(path.join(__dirname, "../../video_output/testmerged.mp4"));
  .mergeToFile(path.join(__dirname, "../../video_output/testmerged.mp4"), path.join(__dirname, '../../video_output/tmp'));
  res.json();
});

// @route  POST /api/edit/:id/:timestampOld/:timestampNew
// @desc   Cut video section at timestampOld of video from id and move to timestampNew
// @access Private
router.post("/:id/:timestampOld/:timestampNew", auth, (req, res) => {

});

// @route  POST /api/edit/:id/:timestampTrim
// @desc   Remove video section at timestampTrim
// @access Private
router.post("/:id/:timestampTrim", auth, (req, res) => {

});

module.exports = router;
