import axios from 'axios';
import React, { useEffect } from 'react';
var qs = require('qs');
var data = qs.stringify({
  'scope': 'SERVER_ACCESS' 
})

const Bankcard = () => {

  //
  useEffect(() => {
    
    const displayData = () => {
      const encodedParams = new URLSearchParams();
      encodedParams.set('scope', 'SERVER_ACCESS');
      
      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/token',
        headers: {
          accept: 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic MzA4NDMyZTAtNjgzOS00ZGU0LWJkZDEtOWVhMzc2ZWUyZDJhOmQ4OTE0MjZhLWMzMmYtNDc1Ni04OTIyLWQyNjM2ZmEzODZjNw=='
        },
        data: encodedParams,
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    
    var data = JSON.stringify({
      "email": "teejcoder@gmail.com",
      "mobile": "+61412460636"
    });
    
    var config = {
      method: 'post',
      url: 'https://au-api.basiq.io/users',
      headers: { 
        'Authorization': 'Bearer $YOUR_ACCESS_TOKEN', 
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
    
    // window.location = `https://consent.basiq.io/home?token=${token}`;
    
    var config = {
      method: 'get',
      url: 'https://au-api.basiq.io/users/{user.id}/accounts',
      headers: { 
        'Authorization': 'Bearer $YOUR_ACCESS_TOKEN', 
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
  }; displayData()
  }, []);


  return (
    <div className='border h-96'>
      Bankcard component
    </div>
  );
}

export default Bankcard;