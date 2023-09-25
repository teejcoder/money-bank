import React from 'react';
import Button from './Button';
import Login from './Login';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className=''>
        <Link to='/login'>
        <Button backgroundColor={'blue'}>LOGIN</Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
