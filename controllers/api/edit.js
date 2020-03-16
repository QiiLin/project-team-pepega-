const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fs = require("fs");
const ffmpeg = require("../../controllers/ff_path");
// @route  POST /api/caption
// @desc   Create caption for the selected video
// @access Private
router.post("/:id/caption", (req, res) => {
  // first build the content
  let result = "";
  req.body.data.forEach(function(curr, index) {
    let temp = "" + (index + 1) + "\n";
    temp += curr.time + "\n";
    temp += curr.text + "\n";
    result += temp;
  });
  console.log(result);
  fs.writeFile(
    __dirname + "/../../temp/subtitle/" + req.params.id + "_sub.srt",
    result,
    function(err) {
      if (err) throw err;
      console.log("Saved!");
      // invoke ff
      // let ff = ffmpeg(__dirname + '/../../temp/video/test.mp4');
      // ff.videoFilters(['subtitles='+ __dirname + '/../../temp/subtitle/' + req.params.id + '_sub.srt']);
      // ff.save(__dirname + '/../../temp/video/out.mp4');
      ffmpeg()
        .input(__dirname + "/../../temp/video/test.mp4")
        .outputOptions(`-vf`, "subtitles=/../../temp/subtitle/" + "sub.srt")
        .output(__dirname + "/../../temp/video/out.mp4")
        .on("end", function() {
          console.log("finished");
        })
        .run();
      console.log("proceesed!");
      return res.status(200).end("we did it");
    }
  );
});

// @route  POST /api/edit/transition/:id/
// @desc   Add transition effects in a video at a timestamp
// @access Private
router.post("/transition/:id", auth, (req, res) => {
  let timestampStart = req.body.timestampStart;
  let transitionType = req.body.transitionType;
  if (!timestampStart || !transitionType)
    return res
      .status(400)
      .end("Both timestamp and transition type are required");

  path1 = path.join(__dirname, "../../video_input/test1.mp4");
  let path1_base = path.basename(path1).replace(path.extname(path1), ""); //filename w/o extension
  let path1_tmp = path.join(
    path.dirname(path1),
    "tmp",
    path1_base + "_1" + path.extname(path1)
  ); //temp file loc
  let path2_tmp = path.join(
    path.dirname(path1),
    "tmp",
    path1_base + "_2" + path.extname(path1)
  );
  let pathOut_path = path.join(
    __dirname,
    "../../video_output/",
    path.basename(path1)
  );
  let pathOut_tmp = path.join(__dirname, "../../video_output/tmp");

  ffmpeg.ffprobe(path1, function(err, metadata) {
    let duration = metadata.streams[0].duration; //vid duration in timebase unit
    console.log(metadata.streams[0]);

    ffmpeg({ source: path1 })
      .inputOptions([`-ss 0`, `-to ${timestampStart}`])
      .on("progress", progress => {
        console.log(`[Transition1]: ${JSON.stringify(progress)}`);
      })
      .on("error", function(err) {
        res.json("An error occurred [Transition1]: " + err.message);
      })
      .on("end", function() {
        ffmpeg({ source: path1 })
          .videoFilters(createJSONfilter(transitionType))
          .on("progress", progress => {
            console.log(`[Transition1]: ${JSON.stringify(progress)}`);
          })
          .on("error", function(err) {
            fs.unlink(path1_tmp, err => {
              if (err)
                console.log("Could not remove Transition2 tmp file:" + err);
            });
            res.json("An error occurred [Transition2]: " + err.message);
          })
          .on("end", function() {
            ffmpeg({ source: path1_tmp })
              .mergeAdd(transition_temp)
              .on("progress", progress => {
                console.log(
                  `[TransitionMergeCombine]: ${JSON.stringify(progress)}`
                );
              })
              .on("error", function(err) {
                fs.unlink(path1_tmp, err => {
                  if (err)
                    console.log("Could not remove Transition1 tmp file:" + err);
                });
                fs.unlink(path2_tmp, err => {
                  if (err)
                    console.log("Could not remove Transition2 tmp file:" + err);
                });
                res.json(
                  "An error occurred [TransitionCombine]: " + err.message
                );
              })
              .on("end", function() {
                fs.unlink(path1_tmp, err => {
                  if (err)
                    console.log("Could not remove Transition1 tmp file:" + err);
                });
                fs.unlink(path2_tmp, err => {
                  if (err)
                    console.log("Could not remove Transition2 tmp file:" + err);
                });
                res.json("Merging finished !");
              })
              .mergeToFile(pathOut_path, pathOut_tmp);
          })
          .save(path2_tmp);
      })
      .save(path1_tmp);
  });
});

module.exports = router;
