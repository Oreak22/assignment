const express = require("express");
const {
  allUser,
  register,
  login,
  dashboard,
} = require("../controllers/user.controller");
const tokenVerify = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/allUser", allUser);

router.get("/dashboard", tokenVerify, dashboard);

module.exports = router;
