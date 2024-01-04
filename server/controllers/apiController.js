require('dotenv').config();
const axios = require('axios');

const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

const apiController = {

  // Generate Auth Token Function
  authToken: async () => {

    try {
      console.log('Starting authToken function');
      const encodedParams = new URLSearchParams();
      encodedParams.set('scope', 'SERVER_ACCESS');

      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/token',
        headers: {
          'accept': 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${BASIQ_API_KEY}`,
        },
        data: encodedParams,
      };

      console.log('Before Axios request');
      const response = await axios(options);
      console.log('After Axios request');

    } catch (error) {
      console.error('Error:', error);
    }
  }
};

module.exports = apiController;
