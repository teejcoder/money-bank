import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { LuLogOut, LuUser2 } from 'react-icons/lu';
import { MdOutlineDarkMode } from "react-icons/md";

function Sidebar() {
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
    <aside className="fixed top-0 mt-20 h-52 w-full sm:h-full sm:w-24 flex flex-col justify-between border-r z-50 bg-white">
      {/* Icons at the top */}
      <div className="mt-5">

      {/* Icon 1 */}
      <button className="w-full p-4 hover:bg-blue-300 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <LuUser2 size='26px' color='#000'/>
        </svg>
      </button>

      {/* Icon 2 */}
      <button className="w-full p-4 hover:bg-blue-300 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <MdOutlineDarkMode size='26px' color='#000'/>
        </svg>
      </button>

      {/* Logout icon at the bottom */}
      <button onClick={handleLogout} className="w-full p-4 hover:bg-blue-300 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <LuLogOut size='26px' color='#000' />
        </svg>
      </button>
      </div>
    </aside>
  );
}

export default Sidebar;
