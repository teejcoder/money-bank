import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
    const [user, setUser] = useState(null);

    
    const response = await googleLoginFunction()

    const signInWithGoogle = async () => {
        const { data, error } = await supabase
        .from('user_data')
        .upsert([
        {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            google_id: user.google_id
        },
        ]);

    if (error) {
        console.error('Error saving user data to Supabase:', error.message);
    } else {
        console.log('User data saved to Supabase:', data);
    } 
    
    

  return (
    <div>
        {user ? (
        <p>Welcome, {user.name}!</p>
        ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
    </div>
  )
}

export default GoogleAuth