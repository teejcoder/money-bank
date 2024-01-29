const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const port = process.env.PORT || 5001;
const path = require('path'); 

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
