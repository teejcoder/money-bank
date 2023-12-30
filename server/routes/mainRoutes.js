// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController'); // Import your main controller

// Define your main route ("/") and specify the controller function
router.get('/', mainController.renderApp);
router.get('/profile', mainController.getProfile);

module.exports = router;