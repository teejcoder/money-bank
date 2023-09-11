import React from 'react';
import Button from './Button';

const Welcome = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className=''>
        <Button url='/login' backgroundColor={'green'}>
          LOGIN
        </Button>
        <Button url='/signup'>SIGNUP</Button>
      </div>
    </div>
  );
};

export default Welcome;
