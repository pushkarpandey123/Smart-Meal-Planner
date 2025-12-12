// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');                  // MongoDB connection
const authRoutes = require('./routes/auth');        // Auth routes (Register & Login)
const protectedRoutes = require('./routes/protected'); // Protected routes (after-login pages)

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);      // Register & Login endpoints
app.use('/api', protectedRoutes);      // Protected endpoints (after-login pages)

// Root test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// MongoDB connection test
app.get('/test-db', async (req, res) => {
  try {
    res.send('MongoDB connection is working!');
  } catch (err) {
    res.status(500).send('MongoDB connection failed: ' + err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
