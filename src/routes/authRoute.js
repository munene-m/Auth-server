const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController.js");

const { authMiddleware } = require("../middleware/authMiddleware.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile/:userId").get(authMiddleware, getProfile);

module.exports = router;
