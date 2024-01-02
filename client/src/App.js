// import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';

const App = () => {
  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api");
  //       console.log(response);
  //       const data = await response.json();
  //       setBackendData(data);
  //     } catch (error) {
  //       console.error('Error fetching data from the server:', error);
  //     }
  //   };
  //   fetchData()
  // }, [])

  // {(typeof backendData.users === "undefined") ? (
  //   <p>Loading..</p>
  // ) : (
  //   backendData.users.map((user, i) => (
  //     <p key={i}>{user}</p>
  // ))
  // )}

  return (
    <div className='font-montserrat'>
      <Header />
      <Hero />
      <Welcome />
    </div>
  );
}

export default App;