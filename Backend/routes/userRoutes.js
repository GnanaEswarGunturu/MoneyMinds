const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController.js");
const userAuth = require("../middlewares/userAuth.js");

router.get("/get-user-data", userAuth, getUserData);

module.exports = router;
