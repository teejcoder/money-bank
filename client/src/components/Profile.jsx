import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Bankcard from "./Bankcard";

function Profile() {
  
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
