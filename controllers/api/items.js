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
router.post("/", upload.single("name"), (req, res) => {
  //auth
  // const newItem = new Item({
  //   name: req.body.name
  // });
  // newItem.save().then(item => res.json(item));
  console.log(req.body);
  console.log(req.file);
  // let newItem = {
  //   name: req.file
  // };
  // newItem.save().then(item => res.json(item));
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
