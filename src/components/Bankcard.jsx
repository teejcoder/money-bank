import axios from 'axios';
import React, { useEffect } from 'react';

 
const Bankcard = () => {
  const api_key = process.env.REACT_APP_BASIQ_API_KEY;
  
  useEffect(() => {

    const displayData = async () => {
      const data = new URLSearchParams();
      data.set('scope', 'SERVER_ACCESS');
        

      var config = {
        method: 'post',
        url: 'https://au-api.basiq.io/token',
        headers: { 
          'Authorization': `Basic ${api_key}`, 
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
    };
    displayData();
  }, []);

  
  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>
        It looks a little empty here.. 
      </p>
      <button className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'>
        Connect Bank
      </button>
    </div>
  );
}

export default Bankcard;