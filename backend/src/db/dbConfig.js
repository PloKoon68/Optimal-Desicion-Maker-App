const { Pool } = require("pg");

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

//console.log("database port: ", (process.env.DATABASE_PORT))



/* for local dev
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  
});
*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // The full connection URL
  ssl: { rejectUnauthorized: false} // Bunu "require" olarak tut

});

/*
//test by fetching time
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Database time: ', res.rows[0]);
  }
});
*/

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