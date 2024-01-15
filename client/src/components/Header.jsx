import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { MdOutlineDarkMode } from "react-icons/md";
import { useDarkMode } from '../contexts/DarkModeContext';

const Header = ({ toggleSidebar }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [userDisplayName, setUserDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayUserName = async () => {
      if (supabase.auth) {
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (user) {
            setUserDisplayName(user.user_metadata.full_name);
          } else {
            setUserDisplayName('');
          }
          if (error) {
            setError(error.message);
          }
        } catch (error) {
          console.error('Error fetching user:', error.message);
          setError('An error occurred while fetching user data.');
        } finally {
          setLoading(false);
        }
      }
    };
    displayUserName();
  }, []);

  return (
    <div className={`h-20 w-full p-10 top-0 sticky border-b flex justify-between items-center ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      <button onClick={toggleSidebar} className="text-4xl md:text-5xl">
        ☰ {/* Hamburger menu icon */}
      </button>

      {loading ? (
        <p className='pr-4'>Loading...</p>
      ) : (
        <div className={`flex items-center justify-center pr-4`}>
          <button className="w-20 mr-5 content-end focus:outline-none" onClick={toggleDarkMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-8 w-8 mx-auto ${isDarkMode ? 'text-dark' : 'text-light'}`}
            >
              {isDarkMode ? 'On' : 'Off'}
            <MdOutlineDarkMode size='26px'/>
            </svg>
          </button>        
          <p>{userDisplayName ? `${userDisplayName}` : 'Hi'}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
