import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import Header from './Header';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {

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
 