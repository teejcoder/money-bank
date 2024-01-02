require('dotenv').config();
const axios = require('axios');

const apiController = {

  //Generate Auth Token Function
  authToken: () => {
    const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

    const options = {
      method: 'POST',
      url: 'https://au-api.basiq.io/token',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${BASIQ_API_KEY}`,
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

module.exports = apiController;