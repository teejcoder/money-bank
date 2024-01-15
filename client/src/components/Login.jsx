import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './Header';
import { useDarkMode } from '../contexts/DarkModeContext';

const axios = require('axios');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const { isDarkMode } = useDarkMode();

  // useEffect(() => {
  //   const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (event === 'SIGNED_IN' && session?.user) {
  //       const email = session.user.email;
  //       const fullName = session.user.user_metadata?.full_name || '';
  //       await axios.post("/auth/login", { email, fullName });
  //     }
  //   });
  // }, []);

  return (
    <div>
      <Header />
      <div className={`flex h-screen justify-between flex-col items-center py-20 ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
        <Auth
          redirectTo="http://localhost:3000/profile"
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          queryParams={{
            access_type: 'offline',
            prompt: 'consent',
            hd: 'domain.com',
          }}
        />
      </div>
    </div>
  );
};

export default Login;
