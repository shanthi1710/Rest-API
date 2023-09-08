const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL || "mongodb://0.0.0.0:27017", { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json())

// root directory
const managementRouter = require('./routes/management');
app.use('/management',managementRouter)

app.listen(3000, () => {
  console.log('Server started');
});
