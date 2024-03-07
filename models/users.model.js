const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      esum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update("user.password")
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("Users", usersSchema);