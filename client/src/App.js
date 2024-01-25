// import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { useDarkMode } from './contexts/DarkModeContext';

const App = () => {
  const {isDarkMode} = useDarkMode();

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'}`}>
      <Header />
      <Hero />
    </div>
  );
}

export default App;