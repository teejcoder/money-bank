const express = require('express');
const cors = require('cors');
const path = require('path'); 
const mainRoutes = require('./routes/mainRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Use CORS middleware
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/", mainRoutes)
app.use("/auth", authRoutes);


app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'client/src', 'App.js'));
});  

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});