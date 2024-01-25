// import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import { useDarkMode } from './contexts/DarkModeContext';

const App = () => {
  const {isDarkMode} = useDarkMode();

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'} h-screen`}>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;