const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("../../controllers/ff_path");
// Item model
const Item = require("../../models/Item");
const upload = multer({ dest: path.join(__dirname, "../../client/public") });

let filter = filter_type => {
  switch (filter_type) {
  }
};

// @route  POST /api/caption
// @desc   Create caption for the selected video
// @access Private
router.post("/:id/caption", (req, res) => {
  if (!req.body.data) {
    return res.status(400).end("Bad argument: Missing data");
  }
  let result = "";
  req.body.data.forEach(function(curr, index) {
    let temp = "" + (index + 1) + "\n";
    temp += curr.start_time + " --> " + curr.end_time + "\n";
    temp += curr.text + "\n";
    result += temp;
  });

  // TODO Change path according the database
  let sub_path = path
    .join(__dirname, "/../../temp/subtitle/", req.params.id + "_sub.srt")
    .replace(/\\/g, "\\\\\\\\")
    .replace(":", "\\\\:");

  let srt_path =
    __dirname + "/../../temp/subtitle/" + req.params.id + "_sub.srt";
  let input_path = path.join(__dirname + "/../../temp/video/test.mp4");

  let out_path = path.join(__dirname + "/../../temp/video/out.mp4");
  fs.writeFile(srt_path, result, function(err) {
    if (err) throw err;
    console.log("Saved!");
    ffmpeg()
      .input(input_path)
      .outputOptions([`-vf subtitles=${sub_path}`])
      .output(out_path)
      .on("progress", progress => {
        console.log(`[Caption]: ${JSON.stringify(progress)}`);
      })
      .on("error", function(err) {
        fs.unlink(srt_path, err => {
          if (err) console.log("Could not remove srt file:" + err);
        });
        res.status(500).json("An error occurred [Caption]: " + err.message);
      })
      // .on('stderr', function(stderrLine) {
      //   console.log('Stderr output [Subtitle]:: ' + stderrLine);
      // })
      .on("end", function() {
        fs.unlink(srt_path, err => {
          if (err) console.log("Could not remove srt file:" + err);
        });
        // TODO return data with path to access the file in the database
        return res.status(200).end("Caption is added");
      })
      .run();
  });
});

var getItem = function(id){
  return new Promise(function(resolve, reject){
      Item.findById(id, function (err, res){
        if(err) return reject(err);
        return resolve(res);
      });
  });
}

// @route  POST /api/edit/merge/
// @desc   Append video from idMerge to video from id
// @access Private
router.post("/merge", upload.none(), auth, (req, res) => {
  if (!req.body.curr_vid_id || !req.body.merge_vid_id)
    return res.status(400).end("video id for merging required");

  var path_curr = getItem(req.body.curr_vid_id)
    .catch(function(err){
      return res.status(404).end("current video id not found: " + err);
    });
  var path_merge = getItem(req.body.merge_vid_id)
    .catch(function(err){
      return res.status(404).end("merge video id not found: " + err);
    });

  Promise.all([path_curr, path_merge])
    .then(function(itm){
      var path1 = itm[0].file_path;
      var path2 = itm[1].file_path;
  /*Item.findById(curr_vid_id, 'file_path', function (err, res){
    if(err) return res.status(404).end("current video id not found");
    path1 = res.file_path;
    console.log("path1: ", path1);
  });
  console.log("path1: ", path1);

  Item.findById(merge_vid_id, 'file_path', function (err, res){
    if(err) return res.status(404).end("merge video id not found");
    path2 = res.file_path;
    console.log("path2: ", path2);
  });*/
  var path1_base = path.basename(path1).replace(path.extname(path1), ""); //filename w/o extension
  var path2_base = path.basename(path2).replace(path.extname(path2), "");
  var path1_tmp = path.join(
    path.dirname(path1),
    "tmp/video_input",
    path1_base + "_mod1.avi"
  ); //temp file loc
  var path2_tmp = path.join(
    path.dirname(path2),
    "tmp/video_input",
    path2_base + "_mod2.avi"
  );
  var pathOut_tmp = path.join(__dirname, "../../client/public/tmp/video_output");
  /*var pathOut_path = path.join(
    __dirname,
    "../../client/public/tmp/video_output",
    path1_base + ".avi"
  );*/
  var pathOut_path = path.join(
    __dirname,
    "../../client/public",
    path1_base + ".avi"
  );

  console.log(path1_tmp);
  console.log(path2_tmp);
  console.log(pathOut_tmp);
  console.log(pathOut_path);


  ffmpeg.ffprobe(path1, function(err, metadata) {
    if (err) res.json("An error occurred [MergeResolution]: " + err.message);    
    var width = metadata.streams[0].width;
    var height = metadata.streams[0].height;
    var fps = metadata.streams[0].r_frame_rate;
    console.log(fps);

    ffmpeg(path1)
      .preset("divx")
      .withFpsInput(fps)
      .outputOptions([
        `-vf scale=${width}:${height},setsar=1` //Sample Aspect Ratio = 1.0
      ])
      .on("progress", progress => {
        console.log(`[Merge1]: ${JSON.stringify(progress)}`);
      })
      .on("error", function(err) {
        res.json("An error occurred [Merge1]: " + err.message);
      })
      /*.on('stderr', function(stderrLine) {
      console.log('Stderr output [Merge1]: ' + stderrLine);
    })*/
      .on("end", function() {
        ffmpeg(path2)
          .preset("divx")
          .withFpsInput(fps)
          .outputOptions([`-vf scale=${width}:${height},setsar=1`])
          .on("progress", progress => {
            console.log(`[Merge2]: ${JSON.stringify(progress)}`);
          })
          .on("error", function(err) {
            fs.unlink(path1_tmp, err => {
              if (err) console.log("Could not remove Merge1 tmp file:" + err);
            });
            res.json("An error occurred [Merge2]: " + err.message);
          })
          /*.on('stderr', function(stderrLine) {
        console.log('Stderr output [Merge2]:: ' + stderrLine);
      })*/
          .on("end", function() {
            ffmpeg({ source: path1_tmp })
              .mergeAdd(path2_tmp)
              .on("progress", progress => {
                console.log(`[MergeCombine]: ${JSON.stringify(progress)}`);
              })
              .on("error", function(err) {
                fs.unlink(path1_tmp, err => {
                  if (err)
                    console.log("Could not remove Merge1 tmp file:" + err);
                });
                fs.unlink(path2_tmp, err => {
                  if (err)
                    console.log("Could not remove Merge2 tmp file:" + err);
                });
                res.json("An error occurred [MergeCombine]: " + err.message);
              })
              /*.on('stderr', function(stderrLine) {
                console.log('Stderr output [MergeCombine]:: ' + stderrLine);
              })*/
              .on("end", function() {
                fs.unlink(path1_tmp, err => {
                  if (err)
                    console.log("Could not remove Merge1 tmp file:" + err);
                });
                fs.unlink(path2_tmp, err => {
                  if (err)
                    console.log("Could not remove Merge2 tmp file:" + err);
                });
                const newItem = new Item({
                  uploader_id: itm[0].uploader_id,
                  originalname: itm[0].originalname,
                  file_name: path.basename(itm[0].file_name) + "1" + path.extname(itm[0].file_name),
                  file_path: pathOut_path
                });
                newItem.save().then(item => res.json(item));
              })
              .mergeToFile(pathOut_path, pathOut_tmp);
          })
          .save(path2_tmp);
      })
      .save(path1_tmp);
  });
});
});

// @route  POST /api/edit/cut/:id/
// @desc   Cut video section at timestampOld of video from id and move to timestampNew
// @access Private
router.post("/cut/:id", auth, (req, res) => {
  if (
    !req.body.timestampOldStart ||
    !req.body.timestampOldEnd ||
    !req.body.timestampNewStart
  )
    return res.status(400).end("timestamp required");
});

// @route  POST /api/edit/trim/:id/
// @desc   Remove video section at timestampStart & timestampEnd from body
// @access Private
router.post("/trim/:id/", auth, (req, res) => {
  let timestampStart = req.body.timestampStart;
  let timestampEnd = req.body.timestampEnd;
  if (!timestampStart || !timestampEnd)
    return res.status(400).end("timestamp required");
  //find filename of vid from id
  //set to path1

  path1 = path.join(__dirname, "../../video_input/test1.mp4");
  var path1_base = path.basename(path1).replace(path.extname(path1), ""); //filename w/o extension
  var path1_tmp = path.join(
    path.dirname(path1),
    "tmp",
    path1_base + "_1" + path.extname(path1)
  ); //temp file loc
  var path2_tmp = path.join(
    path.dirname(path1),
    "tmp",
    path1_base + "_2" + path.extname(path1)
  );
  var pathOut_path = path.join(
    __dirname,
    "../../video_output/",
    path.basename(path1)
  );
  var pathOut_tmp = path.join(__dirname, "../../video_output/tmp");

  ffmpeg.ffprobe(path1, function(err, metadata) {
    var duration = metadata.streams[0].duration; //vid duration in timebase unit
    console.log(metadata.streams[0]);

    ffmpeg({ source: path1 })
      .inputOptions([`-ss 0`, `-to ${timestampStart}`])
      .on("progress", progress => {
        console.log(`[Trim1]: ${JSON.stringify(progress)}`);
      })
      /*.on('stderr', function(stderrLine) {
      console.log('Stderr output [Trim1]: ' + stderrLine);
    })*/
      .on("error", function(err) {
        res.json("An error occurred [Trim1]: " + err.message);
      })
      .on("end", function() {
        ffmpeg({ source: path1 })
          .inputOptions([`-ss ${timestampEnd}`, `-to ${duration}`])
          .on("progress", progress => {
            console.log(`[Trim1]: ${JSON.stringify(progress)}`);
          })
          /*.on('stderr', function(stderrLine) {
        console.log('Stderr output [Trim1]: ' + stderrLine);
      })*/
          .on("error", function(err) {
            fs.unlink(path1_tmp, err => {
              if (err) console.log("Could not remove Trim2 tmp file:" + err);
            });
            res.json("An error occurred [Trim2]: " + err.message);
          })
          .on("end", function() {
            ffmpeg({ source: path1_tmp })
              .mergeAdd(path2_tmp)
              .on("progress", progress => {
                console.log(`[MergeCombine]: ${JSON.stringify(progress)}`);
              })
              .on("error", function(err) {
                fs.unlink(path1_tmp, err => {
                  if (err)
                    console.log("Could not remove Trim1 tmp file:" + err);
                });
                fs.unlink(path2_tmp, err => {
                  if (err)
                    console.log("Could not remove Trim2 tmp file:" + err);
                });
                res.json("An error occurred [TrimCombine]: " + err.message);
              })
              /*.on('stderr', function(stderrLine) {
          console.log('Stderr output [MergeCombine]:: ' + stderrLine);
        })*/
              .on("end", function() {
                fs.unlink(path1_tmp, err => {
                  if (err)
                    console.log("Could not remove Trim1 tmp file:" + err);
                });
                fs.unlink(path2_tmp, err => {
                  if (err)
                    console.log("Could not remove Trim2 tmp file:" + err);
                });
                res.json("Merging finished !");
              })
              .mergeToFile(pathOut_path, pathOut_tmp);
          })
          .save(path2_tmp);
      })
      .save(path1_tmp);
  });

  /*ffmpeg({ source: path1 })
    .complexFilter([      
      `[0:v]trim=start=00:00:00.000:end=00:00:02.000[av]`,
      `[0:a]atrim=start=00:00:00.000:end=00:00:02.000[aa]`,
      `[0:v]trim=start=00:00:05.000:end=00:00:21.000,setpts=PTS-STARTPTS[bv]`, //,setpts=PTS-STARTPTS[bv]
      `[0:a]atrim=start=00:00:05.000:end=00:00:21.000,asetpts=PTS-STARTPTS[ba]`, //,asetpts=PTS-STARTPTS[ba]
      `[av][aa][bv][ba]concat=:v=0:a=0[outv][outa]`
    ])
    .outputOptions([
      `-map [outv]`,
      `-map [outa]`
    ])
    .on('stderr', function(stderrLine) {
      console.log('Stderr output [MergeTrim]: ' + stderrLine);
    })
    .on('end', function() {
      res.json('Trim finished !');
    })
    .save(pathOut_path);*/
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
      .inputOptions([`-ss 0`, `-to ${req.body.timestampStart}`])
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
