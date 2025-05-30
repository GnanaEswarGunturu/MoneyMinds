const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyOtp,
    isLoggedIn,
    resetOtp,
    resetPassword,
} = require("../controllers/authController.js");
const userAuth = require("../middlewares/userAuth.js");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/send-verify-otp", userAuth, sendVerifyOtp);
router.post("/verify-account", userAuth, verifyOtp);
router.post("/is-auth", userAuth, isLoggedIn);
router.post("/reset-password-otp", resetOtp);
router.post("/reset-password", userAuth, resetPassword);

module.exports = router;
