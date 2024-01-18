const { createServerClient } = require('@supabase/ssr');
const axios = require('axios');
require('dotenv').config();

const authController = {

  //createClient
  createClient: async (context) => {
    return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      cookies: {
        get: (key) => {
          const cookies = context.req.cookies;
          const cookie = cookies[key] ?? '';
          return decodeURIComponent(cookie);
        },
        set: (key, value, options) => {
          if (!context.res) return;
          context.res.cookie(key, encodeURIComponent(value), {
            ...options,
            sameSite: 'Lax',
            httpOnly: true,
          });
        },
        remove: (key, options) => {
          if (!context.res) return;
          context.res.cookie(key, '', { ...options, httpOnly: true });
        },
      },
    });
  },

  // login 
  login: async (req, res) => {
    try {
      const { full_name, email, google_id } = req.body;

      // Insert the user into the 'users' table
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ full_name, email, google_id }], { onConflict: ['email'], returning: ['*'] });

      if (insertError) {
        console.error('Error storing user data in Supabase:', insertError.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('User data stored on the server:', data);
      console.log('Login successful');
      return res.json({ message: 'Login successful', user: data[0] });
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  logout: async (req, res) => {
    // Logout user
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};

module.exports = authController;
