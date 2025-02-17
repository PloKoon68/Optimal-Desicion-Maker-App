const { pool } = require("./dbConnection");


// Query function using the pool
const runQuery = async (query, params) => {
    const client = await pool.connect(); // Get a client from the pool
    try {
      const result = await client.query(query, params);
      return result;
    } catch (err) {
      console.error("Database query error:", err);
      throw err; // Throw error so it can be handled by the caller
    } finally {
      client.release(); // Release client back to the pool
    }
  };
  
  // Example: Fetch all cases
  const getCases = async () => {
    try {
      const result = await runQuery("SELECT * FROM test", []);
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  
module.exports = { runQuery };