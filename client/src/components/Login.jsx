// Login.js
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import Header from './Header';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY
);

const Login = () => {
  return (
    <div>
      <Header />
      <div className='flex justify-between flex-col items-center py-20 border-b'>
        <Auth
          redirectTo='http://localhost:5001/profile'
          supabaseClient={supabase}
          providers={['google']}
        />
      </div>
    </div>
  );
};

export default Login;
