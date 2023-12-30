// controllers/mainController.js
const path = require('path');

const mainController = {
  // Controller function to render the App component
  renderApp: (req, res) => {
    res.render(path.join(__dirname, '../client/build', 'index.html'));
  },

  // Controller function to render the Profile component
  renderProfile: (req, res) => {
    res.render('Profile.jsx', {
      // Add any data you want to pass to the component here
    });
  },


};

module.exports = mainController;