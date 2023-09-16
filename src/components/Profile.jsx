import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Dashboard from "../components/Dashboard"
import { supabase } from "../supabaseClient"
import { useState } from "react"
import Footer from "./Footer"


function Profile() {
  const [firstName, setFirstName] = useState('')

  const fetchUser = async () => {

    let { error, data: { user } } = await supabase.auth.getUser(user)
    .from('users')
    .select('first_name')
    if (error){
      console.error('Error Fetching Data', error)
    } else {
      setFirstName(user)
      console.log(user)
    }
  }
    
  return (
    <div className="h-screen">

      <Header />

      <div className="flex h-5/6">
        <Sidebar />
        <div className="p-20">
          {/* write Bankcard Component here */}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate esse quam officia deleniti quisquam in! Nemo, cumque doloremque aut neque harum mollitia dignissimos corporis fugit quis deleniti nulla sapiente illo pariatur, sed quos dolorum eos ullam voluptate ea nam nihil consequatur. Corrupti est nemo, dignissimos vero enim neque quibusdam natus facere illo excepturi ipsa, atque, facilis unde. Labore, aspernatur, nihil architecto vero eius rerum veritatis maxime corporis ad eligendi nobis repellat. Explicabo beatae minima enim reprehenderit pariatur blanditiis sed, ipsam aspernatur dolorum eveniet perferendis nesciunt ipsum eum reiciendis neque quis quisquam ratione nostrum? Autem, quasi? Dolorem tempora porro possimus praesentium ab similique adipisci beatae iusto quisquam animi autem alias repellendus pariatur suscipit nesciunt minus accusamus, magnam modi, corporis voluptate esse temporibus commodi sequi dicta? Iure numquam explicabo sapiente maiores sed vitae eveniet, eum laborum delectus suscipit, facilis possimus saepe necessitatibus voluptates sunt eius corporis earum tempore pariatur quo quas. Autem.</p>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Profile;
