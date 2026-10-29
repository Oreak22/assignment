const express = require("express");
const {
  allUser,
  register,
  login,
  dashboard,
  userUpload,
} = require("../controllers/user.controller");
const tokenVerify = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/allUser", allUser);

router.get("/dashboard", tokenVerify, dashboard);
router.post("/upload", userUpload);

module.exports = router;
