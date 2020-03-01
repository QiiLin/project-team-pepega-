const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./controllers/api/items");

const app = express();

// Body parser middleware
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
