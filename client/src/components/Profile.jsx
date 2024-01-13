import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Bankcard from './Bankcard';

function Profile() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {sidebarVisible && <Sidebar />}
        <Bankcard />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
