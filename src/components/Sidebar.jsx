import React from 'react';
import { useState } from 'react';
import { LuLogOut } from 'react-icons/lu';

function Sidebar() {
  const [logoutStatus, setLogoutStatus] = useState(false);

  const handleLogout = () => {

  };

  return (
    <>
      <section className="sidebar">
        <a href="/" onClick={handleLogout}>
          <LuLogOut size='40px' color='red'/>
        </a>
      </section>
    </>
  );
}

export default Sidebar;
