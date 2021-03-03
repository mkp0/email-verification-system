const express = require("express");
const router = express.Router();
const User = require("../models/user");
const checkpres = require("../middleware/alreadyPresentMiddlewere");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
let jwt = require("jsonwebtoken");
const validateMiddlewere = require("../middleware/validationMiddlewere");

dotenv.config();
async function mailsend(token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shubhamprathapp@gmail.com", // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "shubhamprathapp@gmail.com", // sender address
    to: "shadymasum7@gmail.com", // list of receivers
    subject: "Confirmation of email", // Subject line
    text: "Grey Memeber Team", // plain text body
    html: "<b>Grey Memeber Team</b>\n" + "http://localhost:5002/auth/" + token, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

router.get("/", (req, res) => {
  res.json({ response: "we are in auth route" });
});

router.post("/signup", checkpres, validateMiddlewere, (req, res) => {
  const data = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim(),
  };
  const user = new User(data);

  jwt.sign(data, process.env.JWTKEY, (err, token) => {
    user
      .save()
      .then((data) => {
        console.log(data);
        console.log(token);

        mailsend(token).catch(console.error);
        res.send(data);
      })
      .catch((err) => res.json({ err: err }));
  });
});

router.get("/:token", async (req, res) => {
  let decoded = jwt.verify(req.params.token, process.env.JWTKEY);
  const doc = await User.findOneAndUpdate(
    { email: decoded.email },
    { isVerified: true },
    { useFindAndModify: false }
  );
  res.json({ vairfication: "done" });
});

router.post("/login", (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!data.email || !data.password) {
    return res.status(400).json({ err: "Please input all field" });
  }

  User.findOne({ email: data.email }).then((val) => {
    if (val === null) {
      return res.status(400).json({ err: "You dont have any account" });
    }
    if (!val.isVerified) {
      return res.status(400).json({ err: "Verify Your mail to login" });
    }
    if (val.password !== data.password) {
      return res.status(400).json({ err: "Password Wrong" });
    }

    res.json({
      name: val.name,
      email: val.email,
    });
  });
});

module.exports = router;
