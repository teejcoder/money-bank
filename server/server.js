const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const port = process.env.PORT || 5001;
const path = require('path'); 

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://moneybank.cyclic.app/' : '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  console.log('Index path:', indexPath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
