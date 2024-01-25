import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Button = ({ children, onClick }) => {
  const { isDarkMode } = useDarkMode();

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#2EC0F9' : '#8447FF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={onClick} className='w-3/6 h-12 border m-5 text-sm md:text-2xl'>
      {children}
    </button>
  )
};

export default Button;