import React, { useState } from 'react';

import { supabase } from '../supabaseClient';
import { useNavigate } from "react-router-dom";

import Header from './Header';
import Button from './Button';



const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Use Supabase to sign up the user
    const { user, error } = await supabase.auth.signUp({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: 'password', // Replace with the user's password input
    });

    if (error) {
      throw new Error(error.message);
    } else {
      setStatus('success');
      navigate('/profile');
    }
  }

  return (
    <div>
      <Header />
      <div className='flex justify-between flex-col items-center py-20 border-b'>
        <h2 className='text-7xl'>Signup</h2>
        <div>
          <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
          <input
              className='h-10 border-b m-5 w-60'
              placeholder='Type your First Name here..'
              type="text"
              value={firstName}
              onChange={(e) => e.setfirstName()}
              disabled={status === 'submitting' || status === 'success'}
              required
            />
            <input
              className='h-10 border-b m-5 w-60'
              placeholder='Type your Last Name here..'
              type="text"
              value={lastName}
              onChange={(e) => e.setLastName()}
              disabled={status === 'submitting' || status === 'success'}
              required
            />            
            <input
              className='h-10 border-b m-5 w-60'
              placeholder='Type your email here..'
              type="email"
              value={email}
              onChange={(e) => e.setEmail()}
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
    </div>
  );
}

export default Signup;
