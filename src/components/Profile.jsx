import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "./Footer";

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
          {/* put Bankcard Component here */}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate esse quam officia deleniti quisquam in! Nemo, cumque doloremque aut neque harum mollitia dignissimos corporis fugit quis deleniti nulla sapiente illo pariatur, sed quos dolorum eos ullam voluptate ea nam nihil consequatur. Corrupti est nemo, dignissimos vero enim neque quibusdam natus facere illo excepturi ipsa, atque, facilis unde. Labore, aspernatur, nihil architecto vero eius rerum veritatis maxime corporis ad eligendi nobis repellat. Explicabo beatae minima enim reprehenderit pariatur blanditiis sed, ipsam aspernatur dolorum eveniet perferendis nesciunt ipsum eum reiciendis neque quis quisquam ratione nostrum? Autem, quasi? Dolorem tempora porro possimus praesentium ab similique adipisci beatae iusto quisquam animi autem alias repellendus pariatur suscipit nesciunt minus accusamus, magnam modi, corporis voluptate esse temporibus commodi sequi dicta? Iure numquam explicabo sapiente maiores sed vitae eveniet, eum laborum delectus suscipit, facilis possimus saepe necessitatibus voluptates sunt eius corporis earum tempore pariatur quo quas. Autem.</p>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Profile;
