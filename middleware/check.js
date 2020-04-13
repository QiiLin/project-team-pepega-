const validator = require("validator");

let checkName = (req, res, next) => {
    if (!validator.isAlphanumeric(req.body.name))
        return res.status(400).json("bad input");
    next();
}

let checkEmail = (req, res, next) => {
    if (!validator.isEmail(req.body.email))
        return res.status(400).json("bad input")
    next();
}

let checkPassword = (req, res, next) => {
    if (!validator.isAlphanumeric(req.body.password))
        return res.status(400).json("bad input");
    next();
}

module.exports = {
    checkEmail: checkEmail,
    checkName: checkName,
    checkPassword: checkPassword
};