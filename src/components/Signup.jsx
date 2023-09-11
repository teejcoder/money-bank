import React, { useState } from 'react';

import { supabase } from '../supabaseClient';

const Signup = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

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

    } catch (err) {
      setStatus('typing');
      setError(err.message || 'An error occurred during signup');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            className='text-black'
            type="email"
            value={answer}
            onChange={handleInputChange}
            disabled={status === 'submitting' || status === 'success'}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            disabled={status === 'submitting' || status === 'success'}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting...' : 'Sign Up'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      {status === 'success' && <p className="success">Signup successful!</p>}
    </div>
  );
}

export default Signup;
