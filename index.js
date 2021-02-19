const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const keys = require("./keys");

app.use(cors());

mongoose.connect(
  keys.mongouri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  () => {
    console.log("Connected To DB");
  }
);

app.use(express.json());
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.json({ homepage: "We are in Homepage" });
});

app.listen(5002, () => {
  console.log("we are in server " + 5002);
});
