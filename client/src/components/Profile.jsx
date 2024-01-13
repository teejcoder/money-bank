import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Bankcard from "./Bankcard";

function Profile() {
  
  return (
    <div className="h-screen flex flex-col">

      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        <Bankcard />
      </div>

      <Footer/>
    </div>
  );
}

export default Profile;
