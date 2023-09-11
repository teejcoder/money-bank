import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

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
      });
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
      <div className='h-96'>
        <div className='border'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              className='text-black'
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={status === 'submitting' || status === 'success'}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={status === 'submitting' || status === 'success'}
              required
            />
          </div>
          <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
          <div>
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Logging in...' : 'Log In'}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
        {status === 'success' && <p className="success">Login successful!</p>}
        </div>
      </div>
  );
};

export default Login;
