const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getAllBlogs,
  getTheBlog,
  createBlog,
  createComment,
} = require("../controllers/blogsControllers");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", getAllBlogs).get("/:id", getTheBlog);

router
  .post("/", upload.single("coverImage"), (req, res) => {
    createBlog(req, res, req.file.filename);
  })
  .post("/comment/:blogId", createComment);

module.exports = router;
