import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "./Footer";
import Bankcard from "./Bankcard";

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "@supabase/auth-ui-react";

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
        console.log(error.response.data)
      }
    }; displayUserName()
  }, [userDisplayName]);
  
  return (
    <div className="h-screen">

      <Header />

      <div className="flex h-5/6">
        <Sidebar />

        <div className="p-20">
          <div>
            <p>{userDisplayName ? `Hi, ${userDisplayName}!`: <Link to={'/login'}>Click Here to Sign In</Link>}</p>
          </div>
          <Bankcard />
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Profile;
