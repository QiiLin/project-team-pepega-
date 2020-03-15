const express = require("express");
const router = express.Router();

const {gfs_prim, upload} = require('../../middleware/gridSet');
const ffmpeg = require("../../controllers/ff_path");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('video'), (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.findOne({ filename: req.file.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      const readstream = gfs.createReadStream(file.filename);
      ffmpeg.ffprobe(readstream, function (err, metadata) {
        let duration = metadata.streams[0].duration || 100;
        const newItem = new Item({
          uploader_id: mongoose.Types.ObjectId(req.body.uploader_id),
          filename: req.file.filename,
          originalname: req.file.originalname,
          file_path: req.file.path,
          duration: duration
        });
        newItem.save().then(item => res.json(item));
      });
    });
  });
  return res.json({...req.file, _id: req.file.id});
});


// @route GET /api/items
// @desc  Display all files in JSON
router.get('/', (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      // Files exist
      return res.json(files);
    });
  });
});

// @route GET /api/items/:filename
// @desc  Display single file object
router.get('/:filename', (req, res) => {
  // gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
  //     // Check if file
  //     if (!file || file.length === 0) {
  //         return res.status(404).json({
  //             err: 'No file exists'
  //         });
  //     }
  //     // File exists
  //     return res.json(file);
  // });
  gfs_prim.then(function (gfs) {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }

      // Check if image
      // if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      // } else {
      //     res.status(404).json({
      //         err: 'Not an image'
      //     });
      // }
    });


    // TODO:  TRY THIS the below doesn't work
    // let file_id = req.params.filename;
    //
    // gfs.files.find({_id: file_id}).toArray(function (err, files) {
    //     if (err) {
    //         res.json(err);
    //     }
    //     if (files.length > 0) {
    //         let mime = files[0].contentType;
    //         let filename = files[0].filename;
    //         res.set('Content-Type', mime);
    //         res.set('Content-Disposition', "inline; filename=" + filename);
    //         let read_stream = gfs.createReadStream({_id: file_id});
    //         read_stream.pipe(res);
    //     } else {
    //         res.json('File Not Found');
    //     }
    // });
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/:id', (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.remove({ _id: req.params.id, root: 'fs' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      return res.status(200).json("delete done");
    });
  });
});





// ---------------------------stuff below are old code-----//
// // @route  GET /api/items
// // @desc   Get all items
// // @access Public
// router.get("/", (req, res) => {
//   Item.find()
//     .sort({ date: -1 })
//     .then(items => res.json(items));
// });
//
// // var upload = multer({ dest: path.join(__dirname, "../../client/public") });
//
// /* Notes:
//   {
//       fieldname: 'name',
//       originalname: 'avideo.MOV',
//       encoding: '7bit',
//       mimetype: 'video/quicktime',
//       destination: '/Users/harrisonapple/Documents/CSCC09/project-team-pepega/client/public',
//       filename: '4f4395e0f7963b85fe87b3a2482f25cd',
//       path: '/Users/harrisonapple/Documents/CSCC09/project-team-pepega/client/public/4f4395e0f7963b85fe87b3a2482f25cd',
//       size: 4141876
//   }
//
//   Should expect this in db:
//
//   filename: '4f4395e0f7963b85fe87b3a2482f25cd',
//   path: '/Users/harrisonapple/Documents/CSCC09/project-team-pepega/client/public/4f4395e0f7963b85fe87b3a2482f25cd',
// */
//
// // @route  POST /api/items
// // @desc   Create an item
// // @access Private
// router.post("/", upload.single("video"), (req, res) => {
//   let uploaded_file = req.file;
//   console.log("Uploaded file: ", uploaded_file);
//   const newItem = new Item({
//     file_name: uploaded_file.filename,
//     file_path: uploaded_file.path
//   });
//   newItem.save().then(item => res.json(item));
// });
//
// // @route  DELETE /api/items/:id
// // @desc   Delete an item
// // @access Private
// router.delete("/:id", auth, (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ deleted: true })))
//     .catch(err => res.status(404).json({ deleted: false }));
// });
//
// router.post("/upload", auth, (req, res) => {
//   res.json({ name: req.name });
// });

module.exports = router;
