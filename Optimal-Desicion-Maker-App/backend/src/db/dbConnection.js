const { Pool } = require("pg");

// Create a pool of database connections
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MCDM",
  password: "password",
  port: 5432,
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
module.exports = { pool };