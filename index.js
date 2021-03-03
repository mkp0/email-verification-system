const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ejs = require("ejs");
dotenv.config({ path: "/" });

const PORT = process.env.PORT || 5002;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  () => {
    console.log("Connected To DB");
  }
);

app.use(express.json());
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("we are in server " + 5002);
});
