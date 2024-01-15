import React from 'react'
import { useDarkMode } from '../contexts/DarkModeContext';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`h-screen p-10 text-5xl flex flex-col items-center justify-center ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      
      <div className='h-full w-full text-center flex justify-center align-center flex-col'>
        <p className='mb-5'>
          <b>Money Bank</b> Welcome to your financial future!
        </p>
        <div className='text-2xl'>
          <Link to='/login'>
            <Button backgroundColor={'#2EC0F9'}>Login</Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Hero