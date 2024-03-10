require("./config/db");
const path = require("path");
const express = require("express");
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
