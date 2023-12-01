import React from 'react';

const Bankcard = () => {
  const api_key = process.env.REACT_APP_BASIQ_API_KEY;
  
  const handleClick = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${api_key}`,
        },
        body: new URLSearchParams({ scope: 'CLIENT_ACCESS' }),
        mode: 'cors',
      };
  
      const response = await fetch('https://au-.basiq.io/token', options);
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };
  
  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>
        It looks a little empty here.. 
      </p>
      <button onClick={handleClick} className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'>
        Connect Bank
      </button>
    </div>
  );
}

export default Bankcard;