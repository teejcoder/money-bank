const express = require('express');
const mainController = require('../controllers/mainController'); // Import your main controller
const router = express.Router();

// Define your main route ("/") and specify the controller function
router.get('/', mainController.renderApp);

module.exports = router;