import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Button from './Button';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus('submitting');
      // Use Supabase to log in the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        throw new Error(error.message);
      }
      // Assuming the login was successful:
      setStatus('success');
      setError(null);
    } catch (err) {
      setStatus('typing');
      setError(err.message || 'An error occurred during login');
    }
  };


  return (
    <>
    <Header />
    <div className='flex justify-between flex-col items-center py-20 border-b'>

        <h2 className='text-7xl'>Login</h2>
        <div>
        <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
            <input
              className='h-10 border-b m-5 w-60'
              placeholder='Type your email here..'
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={status === 'submitting' || status === 'success'}
              required
            />

            <input
              className='h-10 border-b mb-10 m-5 w-60'
              placeholder='Type your password here..'
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={status === 'submitting' || status === 'success'}
              required
            />

            <Button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Logging in...' : 'Log In'}
            </Button>

          {error && <p className="error">{error}</p>}

          {status === 'success' && <p className="success text-5xl text-green-500">Login successful!</p>}
        </form>
        </div>

        </div>

    </>


  );
};

export default Login;
