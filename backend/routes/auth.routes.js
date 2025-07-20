var express = require("express");
var router = express.Router();
var AuthController = require("../controllers/auth.controller.js");

// Create an instance of the controller
var authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

module.exports = router;
