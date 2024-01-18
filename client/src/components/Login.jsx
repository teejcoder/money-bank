import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './Header';
import { useDarkMode } from '../contexts/DarkModeContext';

import { Link, Navigate } from 'react-router-dom';
import Button from './Button';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const { isDarkMode } = useDarkMode();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  const loginWithGoogle = async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
        }
      }
    });
    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
      return (Navigate('/profile'))
    }

  };

  return (
    <div>
      <Header />
      <div className={`flex h-screen justify-between flex-col items-center py-20 ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
        {session ? (
          <div className='h-5/6 w-full flex items-center justify-center flex-col'>
            <p>Logged in!</p>
            <Link className='w-full text-center' to='/profile'>
              <Button>Click Here to Continue!</Button>
            </Link>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Login;
