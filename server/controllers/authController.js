// controllers/authController.js
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const authController = {
  register: async (req, res) => {
    // Register a new user
    try {
      const { email, password } = req.body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      const { user, error } = await supabase.auth.signUp({
        email,
        password: hashedPassword,
      });

      if (error) throw error;

      res.json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    // Login user
    try {
      const { email, password } = req.body;

      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) throw error;

      // Generate JWT token for additional authentication
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', user, session, token });
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
  },
};

module.exports = authController;
