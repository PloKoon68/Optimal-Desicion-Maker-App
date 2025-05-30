const { Pool } = require("pg");

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });


/*
DATABASE_USER=postgres
DATABASE_HOST=localhost
DATABASE_SERVER=MCDM
DATABASE_PASSWORD=password
DATABASE_PORT=5432

PORT=5000
DATABASE_URL=postgresql://optimal_desicion_maker_app_db_user:AKCSbKbbujo6Nazoby5oTT2cafasHWVc@dpg-cvap65ij1k6c738vkaf0-a.frankfurt-postgres.render.com/optimal_desicion_maker_app_db
*/
/*
// for local dev
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_SERVER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});
*/
//for deploy!!!
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