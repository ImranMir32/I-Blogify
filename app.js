const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/i-blogify")
  .then(() => {
    console.log("mongodb database is connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoutes);

module.exports = app;
