import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

import Button from './Button';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus('submitting');
      console.log("Email:", email);
      console.log("Password:", password);

      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Assuming the login was successful:
      setStatus('success');
      setError(null);
      navigate('/profile');

    } catch (err) {

      console.error(err); // Log the error
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
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting' || status === 'success'}
              required
            />
            <input
              className='h-10 border-b mb-10 m-5 w-60'
              placeholder='Type your password here..'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
