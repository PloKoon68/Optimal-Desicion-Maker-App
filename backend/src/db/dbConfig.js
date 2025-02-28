const { Pool } = require("pg");

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

console.log("user isA : ", (process.env.DATABASE_PORT))

// Create a pool of database connections
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_SERVER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});




// Log successful connection
pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

// Handle database errors
pool.on("error", (err) => {
  console.error("Unexpected database error, couldn't connect", err);
});

// Export the pool and query function
module.exports = pool;