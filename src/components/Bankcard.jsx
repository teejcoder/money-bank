import axios from 'axios';
import React, { useEffect } from 'react';

const Bankcard = () => {
  useEffect(() => {

    const displayData = async () => {
      const encodedParams = new URLSearchParams();
      encodedParams.set('scope', 'SERVER_ACCESS');
        
      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/token',
        headers: {
          accept: 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic NjExYTVhOGEtNThhZi00ZDhkLWFhM2QtYjBmMzk4ODZmMjE2OjM5ZWQzMzEyLWVhYzQtNDJkMy1hY2IxLWMyNzlmYTJkZjA5MQ==`
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
    };
  
    displayData();
  }, []);

  
  return (
    <div className='h-full w-full flex justify-center items-center'>
      It looks a little empty here.. 
    </div>
  );
}

export default Bankcard;