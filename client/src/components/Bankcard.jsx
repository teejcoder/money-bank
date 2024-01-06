import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bankcard = () => {
  const [authToken, setAuthToken] = useState();

  const getAuthToken = async () => {
    try {
      const response = await axios.post('/api/executeFlow');

      console.log(response);
      setAuthToken(response.access_token);
    } catch (error) {
      console.error('Error in getAuthToken:', error);
    }
  };

  // const createBasiqUserRequest = async () => {
  //   try {
  //     const response = await axios.post('/api/createBasiqUser');
  //     setBasiqUserId(response.data.id)
  //     console.log(response.data);
  //     console.log(basiqUserId);
  //   } catch (error) {
  //     console.error('Error in getAuthToken:', error);
  //   }
  // };

  // const getBasiqUser = async () => {
  //   try {
  //     const response = await axios.get('/api/getBasiqUser');
  //     setBasiqUserId(response.data.id)
  //     console.log(response.data);
  //     console.log(basiqUserId);
  //   } catch (error) {
  //     console.error('Error getBasiqUser:', error);
  //   }
  // };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>It looks a little empty here..</p>
      <button
        onClick={getAuthToken}
        className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
      >
        Connect Bank
      </button>
      {/* <button
        onClick={getBasiqUser}
        className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
      >
        Get Basiq User
      </button>
      <button
        onClick={createBasiqUserRequest}
        className='mt-3 border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
      >
        Create Basiq user
      </button> */}
    </div>
  );
};

export default Bankcard;
