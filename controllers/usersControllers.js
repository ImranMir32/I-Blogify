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

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await Users.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
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
  userSignup,
  userSignin,
};
