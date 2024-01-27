// import { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import Footer from './components/Footer';
>>>>>>> master
import Header from './components/Header';
import Hero from './components/Hero';
import { useDarkMode } from './contexts/DarkModeContext';

const App = () => {
  const {isDarkMode} = useDarkMode();

  return (
<<<<<<< HEAD
    <div className={`${isDarkMode ? 'dark' : 'light'}`}>
      <Header />
      <Hero />
=======
    <div className={`${isDarkMode ? 'dark' : 'light'} h-screen`}>
      <Header />
      <Hero />
      <Footer />
>>>>>>> master
    </div>
  );
}

export default App;