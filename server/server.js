const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example route to fetch data from Supabase
app.get('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabase.from('your_table_name').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);


// Start the server
app.listen(pprocess.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});