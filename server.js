const dotenv = require('dotenv');
dotenv.config();

const pool = require('./config/db');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

/**
 * ✅ FIXED CORS CONFIG
 * - Automatically reflects the request origin
 * - Works for localhost + deployed frontend
 */
app.use(cors({
  origin: true,
  credentials: true
}));

// Middleware
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('Team Task Manager Backend is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Something went wrong!'
  });
});

// Server start
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
