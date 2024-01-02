

const apiController = {

    authToken: async (req, res)  => {
    const api_key = process.env.BASIQ_API_KEY;

    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${api_key}`,
        },
        body: new URLSearchParams({ scope: 'SERVER_ACCESS' }),
        mode: 'cors',
      };
  
      const response = await fetch('https://au-.basiq.io/token', options);
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      };
  
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Error:', err.message);
    };
    }

}

module.exports = apiController