const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

// Register a new user
router.post("/authToken", apiController.authToken);

router.post("/createBasiqUser", apiController.createBasiqUser);


module.exports = router;
