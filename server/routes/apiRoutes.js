const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

// Register a new user
router.post("/executeFlow", apiController.executeFlow);

router.get("/getBasiqUser", apiController.getBasiqUser);

router.post("/createBasiqUser", apiController.createBasiqUser);

router.get("/getTransactions", apiController.getTransactions);

module.exports = router;
