const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");
const config = require("config");
const url = config.get("mongoURI");

const storage = new GridFsStorage({
  url: url,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
// const upload = multer({ storage });

const app = express();

// Item model
const Item = require("../../models/Item");

// @route  GET /api/items
// @desc   Get all items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

var upload = multer({ dest: path.join(__dirname, "../../client/public") });

// @route  POST /api/items
// @desc   Create an item
// @access Private
router.post("/", upload.single("video"), (req, res) => {
  // {
  //     fieldname: 'name',
  //     originalname: 'avideo.MOV',
  //     encoding: '7bit',
  //     mimetype: 'video/quicktime',
  //     destination: '/Users/harrisonapple/Documents/CSCC09/project-team-pepega/client/public',
  //     filename: '4f4395e0f7963b85fe87b3a2482f25cd',
  //     path: '/Users/harrisonapple/Documents/CSCC09/project-team-pepega/client/public/4f4395e0f7963b85fe87b3a2482f25cd',
  //     size: 4141876
  // }
  let uploaded_file = req.file;
  console.log(uploaded_file);
  const newItem = new Item({
    file_name: uploaded_file.filename,
    file_path: uploaded_file.path
  });
  newItem.save().then(item => res.json(item));

  /* should expect this in db
  filename: '4f4395e0f7963b85fe87b3a2482f25cd',
  path: '/Users/harrisonapple/Documents/CSCC09/project-team-pepega/client/public/4f4395e0f7963b85fe87b3a2482f25cd',
  */
});

// @route  DELETE /api/items/:id
// @desc   Delete an item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
});

router.post("/upload", auth, (req, res) => {
  res.json({ name: req.name });
});

module.exports = router;
