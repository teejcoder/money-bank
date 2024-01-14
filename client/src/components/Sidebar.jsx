import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { LuLogOut, LuUser2 } from 'react-icons/lu';
import { MdOutlineSummarize } from "react-icons/md";
import { useDarkMode } from '../contexts/DarkModeContext';

const Sidebar = () => {
  const { isDarkMode } = useDarkMode();
  const [logoutStatus, setLogoutStatus] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out user', error)
    } else {
      setTimeout(() => {
        navigate('/')
        setLogoutStatus(true)
      }, 0);
    }
  };

  return (
    <aside className={`fixed top-0 mt-20 h-40 w-full xl:h-full xl:w-24 flex flex-col justify-between border-b sm:border-r z-50 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      {/* Icons at the top */}
      <div className="mt-5">

      {/* User settings icon */}
      <button 
        className={`w-full p-4 focus:outline-none ${isDarkMode ? 'hover:bg-btnLight' : 'hover:bg-btnDark'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <LuUser2 size='26px' color={isDarkMode ? '#fff' : '#000'}/>
        </svg>
      </button>

      {/* Transactions Icon */}
      <button 
        className={`w-full p-4 focus:outline-none ${isDarkMode ? 'hover:bg-btnLight' : 'hover:bg-btnDark'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <MdOutlineSummarize size='26px' color={isDarkMode ? '#fff' : '#000'} />
        </svg>
      </button>

      {/* Logout Icon */}
      <button
        onClick={handleLogout}
        className={`w-full p-4 focus:outline-none ${isDarkMode ? 'hover:bg-btnLight' : 'hover:bg-btnDark'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <LuLogOut size='26px' color={isDarkMode ? '#fff' : '#000'} />
        </svg>
      </button>
      </div>
    </aside>
  );
}

export default Sidebar;
