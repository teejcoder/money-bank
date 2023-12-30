import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Bankcard from "./Bankcard";

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function Profile() {
  const [userDisplayName, setUserDisplayName] = useState('')

  useEffect(() => {
    const displayUserName = async () => {
      const { data: {user}, error } = await supabase.auth.getUser()
      if (user){
        setUserDisplayName(user.user_metadata.full_name)
      }
      else {
        setUserDisplayName('')
      }
      if (error){
        console.log(error)
      }
    }; displayUserName()
  }, [userDisplayName]);
  
  return (
    <div className="h-screen">

      <Header />

      <div className="flex h-5/6">
        <Sidebar />
          <Bankcard />
      </div>

      <Footer/>
    </div>
  );
}

export default Profile;
