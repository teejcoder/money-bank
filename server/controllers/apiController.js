require('dotenv').config();

const apiController = {
  authToken: async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('scope', 'SERVER_ACCESS');

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'basiq-version': '3.0',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${BASIQ_API_KEY}`,
      },
      body: encodedParams,
    };

    return fetch('https://au-api.basiq.io/token', options)
      .then(response => response.json());
  }
};

module.exports = apiController;
