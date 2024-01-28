const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); 
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const port = process.env.PORT || 5001;

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '../client/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
