const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const ItemSchema = new Schema({
  file_name: {
    type: String,
    required: true
  },
  file_path: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
