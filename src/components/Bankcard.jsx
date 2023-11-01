import axios from 'axios';
import React, { useEffect } from 'react';

 
const Bankcard = () => {
  const api_key = process.env.REACT_APP_BASIQ_API_KEY;
  
  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'basiq-version': '3.0',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic MzA4NDMyZTAtNjgzOS00ZGU0LWJkZDEtOWVhMzc2ZWUyZDJhOmNhNzhiODhmLWEyZTgtNDZjOS1iNWZhLTcyZDdjNGI4YTMxNA=='
      }
    };
    
    fetch('https://au-api.basiq.io/token', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
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