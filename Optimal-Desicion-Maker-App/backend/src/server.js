const { runQuery } = require("./db/dbFunctions");

const express = require("express");

const app = express();
app.use(express.json())
const port = 5000;


app.get('/', async (req, res) => {
  try {
    const result = await await getCases();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching cases:', err);
    res.status(500).send('Error fetching cases');
  }
  res.json()
});








process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');

  // Close your database connection, clear up other resources if needed
  await pool.end(); // Close the pool of database connections
  console.log("Connection pool closed.");
  process.exit(0); // Exit with a success status code
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})