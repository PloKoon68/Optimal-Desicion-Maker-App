const express = require("express");
const cors = require("cors");
const pool = require('./db/dbConfig'); // Import your database pool

//require('dotenv').config();
require('dotenv').config({ path: '../.env' });

const casesRoutes = require('./routes/casesRoutes');
const criteriasRoutes = require('./routes/criteriasRoutes');
const decisionMatrixRoutes = require('./routes/decisionMatrixRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({  
  origin: ["http://localhost:3000", "https://plokoon68.github.io"],  // Allow frontend to access backend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true   
}));

app.use(express.json())
app.use(cookieParser());


app.use('/api/cases', casesRoutes);
app.use('/api/criterias', criteriasRoutes);
app.use('/api/decisionMatrix', decisionMatrixRoutes);
app.use('/api/auth', authRoutes);


// Health check endpoint for Render
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});


const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown on Ctrl+C
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  
  try {
    await pool.end(); // Close DB pool
    console.log('Database connection pool closed.');
  } catch (err) {
    console.error('Error closing the database pool:', err);
  }

  server.close(() => {
    console.log('Server closed.');
    process.exit(0); // Exit with a success code
  });
});