const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;
  // Check for token
  if (!token)
    return res.status(401).json({
      msg: "No token, authorization denied"
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      msg: "Invalid token"
    });
  }
}

function isAuth(req, res, next) {
  const token = req.cookies.token;
  // Check for token
  if (!token)
    return res.status(200).json({
      isNotAuth: true
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(200).json({
      isNotAuth: true
    });
  }
}

module.exports = {auth, isAuth};