const Users = require("../models/users.model");

const renderSignin = (req, res) => {
  res.render("signin");
};

const renderSignup = (req, res) => {
  res.render("signup");
};

const renderLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

const renderUserProfile = (req, res) => {
  res.render("userProfile", {
    user: req.user,
  });
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render("signup", {
      error: "All the field is required",
    });
  }
  try {
    await Users.create({
      name,
      email,
      password,
    });
    return res.render("signin");
  } catch (error) {
    return res.render("signup", {
      error: "Email is alread used",
    });
  }
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.render("signin", {
      error: "All the field is required",
    });
  }
  try {
    const token = await Users.matchPasswordAndCreateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

module.exports = {
  renderSignin,
  renderSignup,
  renderLogout,
  renderUserProfile,
  userSignup,
  userSignin,
};
