const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", commentsSchema);
