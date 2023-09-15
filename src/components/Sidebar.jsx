import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

import { LuLogOut } from 'react-icons/lu';

function Sidebar() {
  const [logoutStatus, setLogoutStatus] = useState(false);
  const navigate = useNavigate();

  
  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('error logging out user', error)
    } else {
      navigate('/')
    }
  };

  return (
    <aside className="h-full w-24 pt-20 left-0 flex flex-col justify-between border-r">

      {/* Icons at the top */}
      <div className="mt-5">

        {/* Icon 1 */}
        <button className="w-full p-4 hover:bg-blue-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            {/* Add your first icon here */}
          </svg>
        </button>
        {/* Icon 2 */}
        <button className="w-full p-4 hover:bg-blue-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            {/* Add your second icon here */}
          </svg>
        </button>
      </div>

      {/* Logout icon at the bottom */}
      <button onClick={handleLogout} className="w-full p-4 hover:bg-blue-500 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mx-auto"
        >
          <LuLogOut size='26px' color='red' />
        </svg>
      </button>
    </aside>
  );
}

export default Sidebar;
