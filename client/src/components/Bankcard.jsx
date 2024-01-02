// React component
import React, { useState } from 'react';
import axios from 'axios';

const Bankcard = () => {
  const [authToken, setAuthToken] = useState();

  const getAuthToken = () => {
    axios.post('/api/authToken', {}) // Add an empty object as the data payload
      .then(response => {
        console.log(response.data.authToken);
        setAuthToken(response.data.authToken);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>
        It looks a little empty here.. 
      </p>
      <button onClick={getAuthToken} className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'>
        Connect Bank
      </button>
      <p>{authToken}</p>
    </div>
  );
}

export default Bankcard;
