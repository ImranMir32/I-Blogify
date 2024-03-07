const express = require("express");
const Users = require("../models/users.model");
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await Users.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const isMatched = await Users.matchPassword(email, password);
  // console.log(isMatched);
  if (!isMatched) return res.render("signin");
  return res.redirect("/");
});

module.exports = router;
