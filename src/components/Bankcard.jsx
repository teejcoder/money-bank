import axios from 'axios';
import React, { useEffect } from 'react';
var qs = require('qs');
var data = qs.stringify({
  'scope': 'SERVER_ACCESS' 
})

const Bankcard = () => {

  useEffect(() => {
      const displayData = async () => {
        var config = {
        method: 'post',
        url: 'https://au-api.basiq.io/token',
        headers: { 
          Authorization: 'Basic MzA4NDMyZTAtNjgzOS00ZGU0LWJkZDEtOWVhMzc2ZWUyZDJhOmQ4OTE0MjZhLWMzMmYtNDc1Ni04OTIyLWQyNjM2ZmEzODZjNw==', 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'basiq-version': '3.0'
        },
        data : data
    };
    axios(config)
      .then(() => {
      console.log(data)
    })
      .catch((error) => {
      console.log(error)
    })
  
    }; displayData()
  }, []);


  return (
    <div>
      Bankcard component
    </div>
  );
}

export default Bankcard;