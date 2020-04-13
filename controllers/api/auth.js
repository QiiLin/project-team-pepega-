const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const check = require("../../middleware/check");
const {auth, isAuth} = require("../../middleware/auth");
// User model
const User = require("../../models/User");
const cookie = require('cookie');


// @route  POST /api/auth
// @desc   Authenticate the user
// @access public
router.post("/", check.checkEmail, check.checkPassword, (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }
  // Check for existing user
  User.findOne({
    email: email
  }).then(user => {
    if (!user) return res.status(401).json({
      msg: "User does not exist"
    });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(401).json({
        msg: "Invalid credentials"
      });
      req.session.email = user.email;
      jwt.sign({ id: user.id},
        config.get("jwtSecret"), {
          expiresIn: 3600
        }, (err, token) => {
          if (err) { return res.status(500).end(err); }
          console.log("test");
          // todo change secure to true
          res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            path : '/', 
            maxAge: 3600, // 1 week in number of seconds
            httpOnly: true, 
            sameSite: true, 
            secure: false,
          }));
          res.json({
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

// @route  GET /api/auth/user
// @desc   Get user data
// @access Private
router.get("/user", isAuth, auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;