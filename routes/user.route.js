const express = require("express");
const {
  allUser,
  register,
  login,
  dashboard,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/allUser", allUser);

router.get("/dashboard", dashboard);

module.exports = router;
