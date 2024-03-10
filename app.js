const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blogs.model");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRouters");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

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

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

module.exports = app;
