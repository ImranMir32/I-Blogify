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

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({ createdBy: req.user._id });
    // console.log("my blogs", req.user);
    return res.render("myBlogs", {
      user: req.user,
      blogs,
    });
  } catch (error) {
    // Handle error
    console.error(error);
    return res.render("myBlogs");
  }
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

const updateBlog = async (req, res) => {
  console.log("updated");
  try {
    const blog = await Blogs.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json("blog is not found!");
    }

    const updateBlog = await Blogs.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).send({ blog: updateBlog });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    // Find the blog by ID
    const blog = await Blogs.findById(req.params.blogId);
    if (!blog) {
      return res.render("blog", {
        error: "The Blog is not found",
      });
    }

    // Remove the blog
    await Blogs.findByIdAndDelete(req.params.blogId);

    // Find and remove all comments associated with the blog
    await Comments.deleteMany({ blogId: req.params.blogId });

    return res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllBlogs,
  getTheBlog,
  getUserBlogs,
  createBlog,
  createComment,
  updateBlog,
  deleteBlog,
};
