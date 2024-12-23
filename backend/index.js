const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
require("dotenv").config();

// Connect to database
connectDB();

const app = express();

// CORS middleware should be placed before other routes
const cors = require('cors');
app.use(cors());

// Use JSON parser middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});
