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

module.exports = router;
