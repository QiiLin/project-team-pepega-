const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Video = mongoose.model("Video", VideoSchema);
