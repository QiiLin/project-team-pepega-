const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// @route  POST /api/edit/merge/:id/:idSplice
// @desc   Append video from idMerge to video from id
// @access Private
router.post("/merge/:id/:idMerge", auth, (req, res) => {
  //find filename of 2 vids from id & idMerge
  //set to filepaths, path1 is id & path2 is idMerge

  path1 = path.join(__dirname, "../../video_input/test1.mp4");
  path2 = path.join(__dirname, "../../video_input/test2.mp4");
  path1_base = path.basename(path1).replace(path.extname(path1),""); //filename w/o extension
  path2_base = path.basename(path2).replace(path.extname(path2),"");
  path1_tmp = path.join(path.dirname(path1), 'tmp', path1_base + "_mod.avi"); //temp file loc
  path2_tmp = path.join(path.dirname(path2), 'tmp', path2_base + "_mod.avi");
  pathOut_tmp = path.join(__dirname, '../../video_output/tmp');
  pathOut_path = path.join(__dirname, "../../video_output/", path1_base + ".avi");
  //__dirname, '../../video_input/tmp/test2_changed.avi'   "../../video_output/testmerged.avi"

  ffmpeg.ffprobe(path1, function(err, metadata){
    if(err) res.json('An error occurred [MergeResolution]: ' + err.message);

    var width = metadata.streams[0].width;
    var height = metadata.streams[0].height;

    ffmpeg(path1)
    .preset('divx')
    .size(width + "x" + height)
    .autopad()
    .withFpsInput(30)
    .on('progress', (progress) => {
      console.log(`[Merge1]: ${JSON.stringify(progress)}`);
    })
    .on('error', function(err) {
      res.json('An error occurred [Merge1]: ' + err.message);
    })
    /*.on('stderr', function(stderrLine) {
      console.log('Stderr output [Merge1]: ' + stderrLine);
    })*/
    .on('end', function() {
      ffmpeg(path2)
      .preset('divx')  
      .size("640x360")
      .autopad()
      .withFpsInput(30)
      .on('progress', (progress) => {
        console.log(`[Merge2]: ${JSON.stringify(progress)}`);
      })
      .on('error', function(err) {
        fs.unlink(path1_tmp, (err) => {
          if (err) console.log('Could not remove Merge1 tmp file:' + err);
        });
        res.json('An error occurred [Merge2]: ' + err.message);
      })
      /*.on('stderr', function(stderrLine) {
        console.log('Stderr output [Merge2]:: ' + stderrLine);
      })*/
      .on('end', function() {
        ffmpeg({ source: path1_tmp })
        .mergeAdd(path2_tmp)
        .on('progress', (progress) => {
          console.log(`[MergeCombine]: ${JSON.stringify(progress)}`);
        })
        .on('error', function(err) {
          res.json('An error occurred [MergeCombine]: ' + err.message);
        })
        /*.on('stderr', function(stderrLine) {
          console.log('Stderr output [MergeCombine]:: ' + stderrLine);
        })*/
        .on('end', function() {
          fs.unlink(path1_tmp, (err) => {
            if (err) console.log('Could not remove Merge1 tmp file:' + err);
          });
          fs.unlink(path2_tmp, (err) => {
            if (err) console.log('Could not remove Merge1 tmp file:' + err);
          });
          res.json('Merging finished !');
        })
        .mergeToFile(pathOut_path, pathOut_tmp);
          })
        .save(path2_tmp);
    })
    .save(path1_tmp);  
  })
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
