const express = require("express");
const router = express.Router();
const app = require('../../server');
const { gfs_prim, upload } = require("../gridSet");
const mongoose = require("mongoose");
const {auth} = require("../../middleware/auth");
const edit = require("../api/edit");

// @route POST /upload
// @desc  Uploads file to DB
router.post("/upload", upload.single("video"), auth, async (req, res) => {
  console.log("Uploaded file: ", req.file);  
  let metadata = {
    uploader_id: req.body.uploader_id,
    originalname: req.file.originalname
  };
  gfs_prim.then(function (gfs) {
    gfs.files.update({
      _id: mongoose.Types.ObjectId(req.file.id)
    }, {
      '$set': {
        'metadata': metadata
      }
    })
  });

  edit.generateThumbnail(req.file.id, req.file.filename)
  .then(() => {
    return res.status(200).json({response: "Upload is completed"});
  })
  .catch((err) => {
    return res.status(202).json({response: "Upload is completed: " + err})
  });
});

// @route GET /api/items
// @desc  Display all files in JSON
router.get("/", auth, (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({err: "No files exist"});
      }
      return res.status(200).json(files);
    });
  });
});

// @route GET /api/items/:id
// @desc  Display single file object
router.get('/:id', auth, (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({err: 'No file exists'});
      }

      console.log("mid getting");
      res.set("Content-Type", file.contentType);
      const readstream = gfs.createReadStream(file._id);      
      readstream.pipe(res);
      console.log("done getting");
      return;
    });
  });
});

// @route GET /api/items/thumbnail/:id
// @desc  Display single file object
router.get('/thumbnail/:id', auth, (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.findOne({
      metadata: {
        video_id: mongoose.Types.ObjectId(req.params.id)
      }
    }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return;
      }
      console.log("mid getting thumbnail", file.filename);
      const readstream = gfs.createReadStream(file._id);
      readstream.pipe(res);
      readstream.on('error', function (err) {
        return res.status(400).json({msg: "read fail"});
      });
      return;
    });
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/:id', auth, (req, res) => {
  gfs_prim.then(function (gfs) {
    //this gridfs version can only delete via remove, ignore deprecated warnings
    gfs.remove({
      _id: mongoose.Types.ObjectId(req.params.id),
      root: 'fs'
    }, (err) => {
      if (err) {
        return res.status(404).json({
          err: err
        });
      }
      gfs.files.findOne({
        metadata: {
          video_id: mongoose.Types.ObjectId(req.params.id)
        }
      }, (err, file) => {
        if (file) {
          gfs.remove({
            _id: file._id,
            root: 'fs'
          }, (err) => {
            if (err) {
              return res.status(404).json({err: err});
            }
            return res.status(200).json({response: "delete done"});
          });
        } else {
          return res.status(200).json({response: "delete done without thumbnail"});
        }
      });
    });
  });
});

module.exports = router;