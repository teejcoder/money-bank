import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './Header';
import { useDarkMode } from '../contexts/DarkModeContext';
import axios from 'axios';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [googleId, setGoogleId] = useState('');

  const loginWithGoogle = async (session, user) => {
    try {
      console.log('before loginWithGoogle function in Login component')

      const response = await axios.post('http://localhost:5001/auth/login')

      console.log('loginWithGoogle response: ', response);
      console.log(email, fullName, googleId)
      setEmail(response.data.email);
      setFullName(response.data.full_name);
      setGoogleId(response.data.googleId);
      console.log('after loginWithGoogle function')

    } catch(error) {
      console.error(error)
    };
  };

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
          onSuccess={loginWithGoogle}
        />
      </div>
    </div>
  );
};


export default Login;
