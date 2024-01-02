// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Register a new user
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);


// Logout route
router.post("/logout", authController.logout);

module.exports = router;
