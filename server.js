const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const csurf = require('csurf')
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');

// enable helmet
app.use(helmet());
// // enable helmet Content Security Policy
// This fails on the production
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
//   }
// }))
// set permittedCrossDomainPolicies for flash and adobe stuff
app.use(helmet.permittedCrossDomainPolicies())
// set the same-origin pllicy
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// Body parser middleware
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
); // support encoded bodies
app.use(methodOverride("_method"));
const db = config.get("mongoURI");
const secret = config.get("sessionSecret");
const session = require("express-session");
app.use(cookieParser());
app.use(session({
    name : 'app.sid',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, 
      sameSite: true, 
      secure: true,
      maxAge: 60 * 60 * 1000, 
    }
}));

const csrfProtection = csurf({cookie:false});
app.use(csrfProtection);

app.use(function (req, res, next) {
  var csrfToken = req.csrfToken();
  res.cookie('X-XSRF-TOKEN', csrfToken, {secure: false, sameSite:true});
  next();
});

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.log(err));

app.use("/api/items", require("./controllers/api/items"));
app.use("/api/users", require("./controllers/api/users"));
app.use("/api/auth", require("./controllers/api/auth"));
app.use("/api/edit", require("./controllers/api/edit").router);
// app.all('*', function (req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken())
//   res.render('index')
// })
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {

    // Current directory, go into client/build, and load the index.html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    // Current directory, go into client/build, and load the index.html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

const port = process.env.PORT || 5000;

/*http.createServer(function (req, res) {
  fs.readFile(path.join(__dirname, "/video_output/output.mp4"), function (err, content) {
    if (err) {
      res.writeHead(400, { 'Content-type': 'text/html' })
      console.log(err);
      res.end("No such file");
    } else {
      res.setHeader('Content-disposition', 'attachment; filename=output.mp4');
      res.end(content);
    }
  });
}).listen(3333);*/

app.listen(port, () => console.log(`Server started on port ${port}`));
module.exports = {app};
