const Blogs = require("../models/blogs.model");
const Comments = require("../models/comments.model");

const getAllBlogs = (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
};

const getTheBlog = async (req, res) => {
  const blog = await Blogs.findById(req.params.id).populate("createdBy");
  const comments = await Comments.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
};

const createBlog = async (req, res, filename) => {
  const { title, body } = req.body;
  const blog = await Blogs.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

const createComment = async (req, res) => {
  await Comments.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};

module.exports = {
  getAllBlogs,
  getTheBlog,
  createBlog,
  createComment,
};
