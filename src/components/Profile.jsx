import Header from "../components/Header"
import Sidebar from "../components/Sidebar"


function Profile() {
    
  return (
    <section
        style={{
            backgroundImage:
            "url('https://img.freepik.com/free-photo/abstract-white-color-canvas-wallpaper-textures-surface_74190-6376.jpg?w=2000&t=st=1688908160~exp=1688908760~hmac=5137b20a4f17f3b5317beeb0d3bc282894c838569707b01fde1b6a1dad2cd1f2')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",}}
        >

      {/* <Bankcard /> */}
      <Header />
      <Sidebar />
    </section>
  );
}

export default Profile;
