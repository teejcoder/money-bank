const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const authController = {

  // login with Google
  login: async (req, res) => {
    try {


      // Extract email from user's authentication data
      const email = user.email;
      const full_name = user.full_name;

      // Insert the user into the 'users' table
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ email, full_name }])
        .select();

      if (insertError) {
        console.error('Error storing user data in Supabase:', insertError.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('User data stored on the server:', data);
      console.log('Google Login successful');
      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
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
