import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`h-16 p-10 w-full flex justify-center items-center border-t z-50 ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      <p>&copy; 2024 Money Bank</p>
    </div>
  );
};

export default Footer;