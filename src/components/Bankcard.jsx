import axios from 'axios';
import React, { useEffect } from 'react';

const Bankcard = () => {

  useEffect(() => {
    const displayData = () => {
      var qs = require('qs');
      var data = qs.stringify({
        'scope': 'SERVER_ACCESS' 
      })
      
      var config = {
        method: 'post',
        url: 'https://au-api.basiq.io/token',
        headers: { 
          'Authorization': 'Basic ' + process.env.BASIQ_API_KEY, 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'basiq-version': '3.0'
        },
        data : data
      };
      
      axios(config)
        .then((response) => {
        console.log(response.data)
      })
        .catch((error) => {
        console.log(error)
      })
      
      var data = JSON.stringify({
        "email": "teejcoder@gmail.com",
        "mobile": "+61412460636"
      });
      
      var config = {
        method: 'post',
        url: 'https://au-api.basiq.io/users',
        headers: { 
          //'Authorization': `Bearer ${ACCESS_TOKEN}`, 
          'Authorization': `Bearer `, 
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
      // STORE TOKEN FOR URL FROM DATA
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
    <div className='h-full w-full flex justify-center items-center'>
      Bankcard component
    </div>
  );
}

export default Bankcard;