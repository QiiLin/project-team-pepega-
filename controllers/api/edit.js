const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fs = require('fs');
const ffmpeg  = require('fluent-ffmpeg');
// @route  POST /api/caption
// @desc   Create caption for the selected video
// @access Private
router.post("/:id/caption", (req, res) => {
    // first build the content
    let result = "";
    req.body.data.forEach( function (curr, index) {
        let temp = "" + index + "\n";
        temp += curr.time + "\n";
        temp += curr.text + "\n";
        result += temp;
    });
    console.log(result);
    fs.writeFile( __dirname + '/../../temp/subtitle/'+ req.params.id + '_sub.srt', result, function (err) {
        if (err) throw err;
        console.log('Saved!');
        // invoke ff
        // let ff = ffmpeg(__dirname + '/../../temp/video/test.mp4');
        // ff.videoFilters(['subtitles='+ __dirname + '/../../temp/subtitle/' + req.params.id + '_sub.srt']);
        // ff.save(__dirname + '/../../temp/video/out.mp4');
        ffmpeg()
            .input(__dirname + '/../../temp/video/test.mp4')
            .outputOptions([`-vf` + 'subtitles='+ __dirname + '/../../temp/subtitle/' + req.params.id + '_sub.srt' ])
            .output(__dirname + '/../../temp/video/out.mp4').run();
        console.log('proceesed!');
        return res.status(200).end("we did it");
    });
});



module.exports = router;
