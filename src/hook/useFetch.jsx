import React from 'react'

const useFetch = () => {
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
    'scope': 'SERVER_ACCESS' 
  })

  var config = {
    method: 'post',
    url: 'https://au-api.basiq.io/token',
    headers: { 
      'Authorization': `Basic ${MzA4NDMyZTAtNjgzOS00ZGU0LWJkZDEtOWVhMzc2ZWUyZDJhOmZmYzk3NWNlLWE4YjgtNDc0NS04MTk0LWUzY2M1NGJjNDJlMw==}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'basiq-version': '3.0'
    },
    data : data
  };

  const response = await axios.request(options);
  authToken = 'Bearer ' + response.data.access_token;
  axios(config)
    .then((response) => {
    console.log(response.data)
  })
    .catch((error) => {
    console.log(error)
  })

  var data = JSON.stringify({
    "email": "max@hooli.com",
    "mobile": "+61412460636"
  });

  var config = {
    method: 'post',
    url: 'https://au-api.basiq.io/users',
    headers: { 
      'Authorization': authToken, 
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  window.location = `https://consent.basiq.io/home?token=${token}`;

  var config = {
    method: 'get',
    url: 'https://au-api.basiq.io/users/{user.id}/accounts',
    headers: { 
      'Authorization': authToken, 
      'Accept': 'application/json'
    }
  };

  axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  return (
    <div>useFetch</div>
  )
}

export default useFetch