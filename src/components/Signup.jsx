import React, { useState } from 'react';

import { supabase } from '../supabaseClient';
import { useNavigate } from "react-router-dom";

import Header from './Header';
import Button from './Button';



const Signup = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      setStatus('submitting');

      // Use Supabase to sign up the user
      const { user, error } = await supabase.auth.signUp({
        email: answer,
        password: 'password', // Replace with the user's password input
      });

      if (error) {
        throw new Error(error.message);
      }

      // Assuming the signup was successful:
      setStatus('success');

      navigate('/profile');
    } catch (err) {
      setStatus('typing');
      setError(err.message || 'An error occurred during signup');
    }
  };

  return (
    <>
    <Header />

    <div className='flex justify-between flex-col items-center py-20 border-b'>
      
      <h2 className='text-7xl'>Signup</h2>
      <div>
        <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
            <input
              className='h-10 border-b m-5 w-60'
              placeholder='Type your email here..'
              type="email"
              value={answer}
              onChange={handleInputChange}
              disabled={status === 'submitting' || status === 'success'}
              required
            />

            <input
              className='h-10 border-b mb-10 m-5 w-60'
              placeholder='Type your password here..'
              type="password"
              disabled={status === 'submitting' || status === 'success'}
              required
            />


            <Button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting...' : 'Sign Up'} 
            </Button>

          {error && <p className="error">{error}</p>}

          {status === 'success' && <p className="success text-5xl text-green-500">Signup successful!</p>}
        </form>

      </div>

    </div>
    </>
  );
}

export default Signup;
