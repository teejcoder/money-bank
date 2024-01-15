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
      const { user } = req.body.authSession;

      // Check if the user already exists in the 'users' table based on their Google ID
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select()
        .eq('google_id', user.id);

      if (fetchError) {
        console.error('Error fetching user data from Supabase:', fetchError.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (existingUser && existingUser.length > 0) {
        // User already exists, perform login
        console.log('User already exists in Supabase:', existingUser[0]);
        res.json({ message: 'Login successful', user: existingUser[0] });
      } else {
        // User doesn't exist, insert the user into the 'users' table
        const email = user.email;
        const full_name = user.full_name;
        const google_id = user.id;

        // Include values for 'created_at' and 'updated_at'
        const currentTimestamp = new Date().toISOString();

        const { data, error: insertError } = await supabase
          .from('users')
          .insert([
            { email, full_name, google_id, created_at: currentTimestamp, updated_at: currentTimestamp }
          ])
          .select();

        if (insertError) {
          console.error('Error storing user data in Supabase:', insertError.message);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('User data stored in Supabase:', data[0]);
        console.log('Google Login successful');
        res.json({ message: 'Login successful', user: data[0] });
      }
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
