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
      response = await axios(options);
      console.log(response.data);
      console.log('After Axios request');
      access_token = response.data.access_token;
    } catch (error) {
      console.error('Error:', error);
    }
  },

  // Create basiq user
  createBasiqUser: async () => {
    try {
      console.log('Starting createBasiqUser function');

      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/users',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${access_token}`
        },
        data: {email: 'gavin@hooli.com', firstName: 'Gavin', lastName: 'Belson'}
      };

      console.log('Before createBasiqUser request');
      const response = await axios(options);
      console.log(response.data)
      console.log('After createBasiqUser request');
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

module.exports = apiController;
