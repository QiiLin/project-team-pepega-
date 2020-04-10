const express = require("express");
const router = express.Router();

const {gfs_prim, upload} = require('../../middleware/gridSet');
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Item = require("../../models/Item");
const edit = require("../api/edit");
//const _ = require("underscore");

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('video'), auth, (req, res) => {
  console.log("Uploaded file: ", req.file);

  edit.generateThumbnail(req.file.id, req.file.filename);

  let metadata = {
    uploader_id: req.body.uploader_id,
    originalname: req.file.originalname
  };
  gfs_prim.then(function (gfs) {
    gfs.files.update({_id: mongoose.Types.ObjectId(req.file.id)}, {'$set': {'metadata': metadata}})
  });
  
  /*const newItem = new Item({
    uploader_id: mongoose.Types.ObjectId(req.body.uploader_id),
    gfs_id: mongoose.Types.ObjectId(req.file.id),
    originalname: req.file.originalname,
    file_path: req.file.path 
  });
  newItem.save();*/
  const { id, uploadDate, filename, md5, contentType} = req.file;
  return res.json({
    "_id": id,
    "uploadDate": uploadDate,
    "filename": filename,
    "md5": md5,
    "contentType": contentType,
    "metadata": metadata
  });
});


// @route GET /api/items
// @desc  Display all files in JSON
router.get('/', auth, (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      console.log("get item is called");
      // Files 
      
      /*Item.find({}, function(err, filesMetadata){
        let itm = _.map(files, function(file){ 
          let metadata = _.find(filesMetadata, function(fileMetadataRes){ //match gfs_id of metadata collection to _id of gridfs collection
            return fileMetadataRes.gfs_id.toString() === file._id.toString(); //toString gets rid of mongoose objectid type
          });
          //add fields from metadata collection
          file.uploader_id = metadata ? metadata.uploader_id : '';
          file.originalname = metadata ? metadata.originalname : '';
          return file; 
        });
        return res.json(itm);
      });*/
      return res.json(files);
    });
  });
});

// @route GET /api/items/:id
// @desc  Display single file object
router.get('/:id', (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }

      console.log("mid getting");

      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      /*readstream.on('end', function() {
        const readstreamMetadata = Item.find({gfs_id: mongoose.Types.ObjectId(req.params.id)}).stream();
        readstreamMetadata.pipe(res);
      });*/
      console.log("done getting");
      return;
    });
  });
});

// @route GET /api/items/thumbnail/:id
// @desc  Display single file object
router.get('/thumbnail/:id', (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.files.findOne({ metadata: { video_id: mongoose.Types.ObjectId(req.params.id) } }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }

      console.log("mid getting thumbnail", file.filename);

      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      readstream.on('error', function (err) {
        console.log('An error occurred!', err);
        throw err;
      });
      /*readstream.on('end', function() {
        const readstreamMetadata = Item.find({gfs_id: mongoose.Types.ObjectId(req.params.id)}).stream();
        readstreamMetadata.pipe(res);
      });*/
      console.log("done getting thumbnail");
      return res.status(200);
    });
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/:id', (req, res) => {
  gfs_prim.then(function (gfs) {
    gfs.remove({ _id: mongoose.Types.ObjectId(req.params.id), root: 'fs' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      

      /*Item.deleteOne({ gfs_id : mongoose.Types.ObjectId(req.params.id)})
      .then(() => {
        return res.status(200).json("delete done");
      }).catch(err => res.status(404).json({ err: err }));      */
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
