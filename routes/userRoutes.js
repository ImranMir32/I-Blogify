const express = require("express");
const {
  renderSignin,
  renderSignup,
  renderLogout,
  userSignup,
  userSignin,
} = require("../controllers/usersControllers");
const router = express.Router();

router
  .get("/signin", renderSignin)
  .get("/signup", renderSignup)
  .get("/logout", renderLogout);

router.post("/signup", userSignup).post("/signin", userSignin);

module.exports = router;
