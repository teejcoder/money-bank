const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

// Register a new user
router.post("/authToken", apiController.authToken);


module.exports = router;
