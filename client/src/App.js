import React, { useContext } from 'react';
import AuthContext from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Login from './components/Login';


const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='font-montserrat'>
      <Header />
      <Hero />
      {isAuthenticated ? <Profile /> : <Login />}
    </div>
  );
}

export default App;