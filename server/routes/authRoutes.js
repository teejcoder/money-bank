// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

//get profile after login
router.get("/profile", authController.getProfile)

// Logout route
router.post("/logout", authController.logout);

module.exports = router;
