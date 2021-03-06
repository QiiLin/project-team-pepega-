const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const check = require("../../middleware/check")
const {auth} = require("../../middleware/auth")
const cookie = require('cookie');
// User model
const User = require("../../models/User");
router.post("/logout", auth, (req,res) => {
  console.log("reached")
  // set the age to 30s
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    path : '/', 
    maxAge: 30,
    httpOnly: true, 
    sameSite: true, 
    secure: false,
  }));
  res.redirect('/');
});

// @route  POST /api/users
// @desc   Register a new user
// @access public
router.post("/", check.checkName, check.checkEmail, check.checkPassword, (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  // Check for existing user
  User.findOne({
    email: email
  }).then(user => {
    if (user) return res.status(400).json({
      msg: "User already exists"
    });

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
          jwt.sign({
              id: user.id
            },
            config.get("jwtSecret"), {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) { return res.status(500).end(err); }
              res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                path : '/', 
                maxAge: 3600, // 1 week in number of seconds
                httpOnly: true, 
                sameSite: true, 
                secure: false,
              }));
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