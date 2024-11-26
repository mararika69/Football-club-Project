const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const footballRoutes = require('./routes/footballerRoutes'); // Import football routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/footballers', footballRoutes); // Footballer routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
