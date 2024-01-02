import React, { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

const Header = () => {
  const [userDisplayName, setUserDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayUserName = async () => {
      if (supabase.auth) {
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (user) {
            setUserDisplayName(user.user_metadata.full_name);
          } else {
            setUserDisplayName('');
          }
          if (error) {
            setError(error.message);
          }
        } catch (error) {
          console.error('Error fetching user:', error.message);
          setError('An error occurred while fetching user data.');
        } finally {
          setLoading(false);
        }
      }
    };
    displayUserName();
  }, []);

  return (
    <div className='h-20 w-full bg-white border-b flex justify-between items-center p-10'>
      <p className='text-2xl md:text-5xl font-bold'>Money Bank</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
          <p>{userDisplayName ? `Hello, ${userDisplayName}` : 'Hi'}</p>
      )}
    </div>
  );
};

export default Header;
