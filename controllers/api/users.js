const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const validator = require("validator")

// User model
const User = require("../../models/User");

let checkName = (req, res, next) => {
  if (!validator.isAlphanumeric(req.body.name))
    return res.status(400).end("bad input");
  next();
}

let checkEmail = (req, res, next) => {
  if (!validator.isEmail(req.body.email))
    return res.status(400).end("bad input")
  next();
}

let checkPassword = (req, res, next) => {
  if (!validator.isAlphanumeric(req.body.password))
    return res.status(400).end("bad input");
  next();
}

// @route  POST /api/users
// @desc   Register a new user
// @access public
router.post("/", checkName, checkEmail, checkPassword, (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          // when we set a token from react or anywhere, the user id is in there
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
