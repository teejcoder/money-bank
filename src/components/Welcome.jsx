import React from 'react';
import Button from './Button';
import Login from './Login';

const Welcome = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className=''>
        <Button url='/login' backgroundColor={'blue'}>LOGIN</Button>
        <Button url='/signup' backgroundColor={'green'}>SIGNUP</Button>
      </div>
    </div>
  );
};

export default Welcome;
