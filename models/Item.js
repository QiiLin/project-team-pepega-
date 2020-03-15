const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const ItemSchema = new Schema({
  uploader_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
