// React component
import React, { useState } from 'react';
import axios from 'axios';

const Bankcard = () => {
  const [authToken, setAuthToken] = useState();

  async function getAuthToken(){
    try{
      const response =  await axios.post('http://localhost:3000/api/authToken');
      setAuthToken(response.data);
    } catch (error) {
      console.error('Error in getAuthToken:', error);
    };
  }

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
