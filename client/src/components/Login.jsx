import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import Header from './Header';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY
);

const Login = () => {

  useEffect(() => {
    
  })

  return (
    <div>
      <Header />
      <div className='flex h-screen justify-between flex-col items-center py-20'>
        <Auth
          redirectTo="http://localhost:3000/profile"
          supabaseClient={supabase}
          providers={['google']}
        />
      </div>
    </div>
  );
};

export default Login;
