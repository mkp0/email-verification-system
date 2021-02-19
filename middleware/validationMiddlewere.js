var validator = require("validator");

const middlewere = (req, res, next) => {
  const data = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim(),
  };

  console.log(data);

  if (data.name === "" || data.email === "" || data.password === "") {
    return res.status(400).json({ err: "Fill all data" });
  }

  /// validator for email
  if (!validator.isEmail(data.email)) {
    return res.status(400).json({ err: "Please enter a valid email!!" });
  }

  //regExp for password
  var regExpforPassword = /^[A-Za-z]\w{7,14}$/;
  if (!regExpforPassword.test(data.password)) {
    return res.status(400).json({
      err:
        "password between 6 to 20 characters contain at least digit, one uppercase,lowercase and special char",
    });
  }
  req.data = data;
  next();
};

module.exports = middlewere;
