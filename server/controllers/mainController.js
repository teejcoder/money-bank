// controllers/mainController.js
const path = require('path');

const mainController = {
    // Controller function to render the App component
    renderApp: (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    },
  };

module.exports = mainController;