const User = require("../models/user");

const middlewere = (req, res, next) => {
  let email = req.body.email;
  console.log(req.get("host"));

  User.findOne({ email }).then((val) => {
    if (val) {
      return res.json({ err: "User already Present" });
    }
    next();
  });
};

module.exports = middlewere;
