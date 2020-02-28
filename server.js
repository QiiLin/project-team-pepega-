const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const videos = require("./controllers/api/videos");

const app = express();

app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use routes
app.use("/api/videos", videos);

// Need process.env if want to deploy to Herouku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
