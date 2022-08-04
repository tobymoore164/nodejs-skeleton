// Setup Dotenv
require('dotenv').config();
// Create app via express
const express = require('express');
const app = express();
// Setup Cors
const cors = require('cors');
// Middleware
app.use(cors());

// Add Routes
const defaultRoutes = require('./routes/default');

// Define Routes
app.use('/api/default', defaultRoutes);

// Start App
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));