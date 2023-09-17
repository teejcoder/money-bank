import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({url, children, backgroundColor}) => {

  const buttonStyle = {
    backgroundColor: backgroundColor || 'black', 
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} className='w-48 h-12 border m-5'>
      {children}
    </button>
  )
};

export default Button;