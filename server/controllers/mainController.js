// controllers/mainController.js
const path = require('path');

const mainController = {
  // Controller function to render the App component
  renderApp: (req, res) => {
    res.render(path.join(__dirname, '../client/src', 'App.js'));
  },

  // Controller function to render the Profile component
  getProfile: (req, res) => {
    res.render(path.join(__dirname, '../client/src', 'Profile.jsx'));
  },


};

module.exports = mainController;