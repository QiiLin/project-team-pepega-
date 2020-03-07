const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fs = require('fs');
const path = require('path');
const ffmpeg  = require('../../controllers/ff_path');


// @route  POST /api/caption
// @desc   Create caption for the selected video
// @access Private
router.post("/:id/caption", (req, res) => {
    if (!req.body.data) {
        return res.status(400).end("Bad argument: Missing data");
    }
    let result = "";
    req.body.data.forEach( function (curr, index) {
        let temp = "" + (index + 1) + "\n";
        temp += curr.start_time + ' --> ' + curr.end_time + "\n";
        temp += curr.text + "\n";
        result += temp;
    });

    // TODO Change path according the database
    let sub_path = path.join(__dirname, "/../../temp/subtitle/",
        req.params.id + "_sub.srt")
        .replace(/\\/g, "\\\\\\\\")
        .replace(":","\\\\:");

    let srt_path = __dirname + "/../../temp/subtitle/" +
        req.params.id + "_sub.srt";
    let input_path =  path.join(__dirname +  "/../../temp/video/test.mp4");

    let out_path = path.join(__dirname + "/../../temp/video/out.mp4");
    console.log(sub_path, srt_path, input_path,out_path);
    fs.writeFile(srt_path, result, function (err) {
        if (err) throw err;
        console.log('Saved!');
        ffmpeg()
            .input(input_path)
            .outputOptions([
              `-vf subtitles=${sub_path}` 
            ])
            .output(out_path)
            .on('progress', (progress) => {
                console.log(`[Caption]: ${JSON.stringify(progress)}`);
            })
            .on('error', function(err) {
                fs.unlink(srt_path, (err) => {
                    if (err) console.log('Could not remove srt file:' + err);
                });
                res.status(500).json('An error occurred [Caption]: ' + err.message);
            })
            // .on('stderr', function(stderrLine) {
            //   console.log('Stderr output [Subtitle]:: ' + stderrLine);
            // })
            .on("end",function () {
                fs.unlink(srt_path, (err) => {
                    if (err) console.log('Could not remove srt file:' + err);
                    res.status(500).json('An error occurred [Caption]: ' + err.message);
                });
                // TODO return data with path to access the file in the database
                return res.status(200).end("Caption is added");
            }).run();
    });
});



module.exports = router;
