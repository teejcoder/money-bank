import React, { useEffect } from 'react';

const Bankcard = () => {

  
  const handleClick = async () => {

    // useEffect(() => {
    //   fetch("/authtoken").then(
    //     response => response.json()
    //   ).then()
    // }, []);
  };
  
  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>
        It looks a little empty here.. 
      </p>
      <button onClick={handleClick} className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'>
        Connect Bank
      </button>
    </div>
  );
}

export default Bankcard;