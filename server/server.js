const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const port = process.env.PORT || 5001;

// Use CORS middleware
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
});  

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});