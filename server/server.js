const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path'); 
const mainRoutes = require('./routes/mainRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const port = process.env.PORT || 5001;

// Use CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', mainRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});