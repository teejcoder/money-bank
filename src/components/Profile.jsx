import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "./Footer";
import Bankcard from "./Bankcard";

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function Profile() {
  const [userDisplayName, setUserDisplayName] = useState('')

  useEffect(() => {
    const displayUserName = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      setUserDisplayName(user.user_metadata.full_name)
      if (error){
        console.log(error)
      }
    }; displayUserName()
  }, []);

  return (
    <div className="h-screen">

      <Header />

      <div className="flex h-5/6">
        <Sidebar />

        <div className="p-20">
          <div>
            <p>{userDisplayName ? `Hi, ${userDisplayName}!`: ''}</p>
          </div>
          <Bankcard />
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Profile;
