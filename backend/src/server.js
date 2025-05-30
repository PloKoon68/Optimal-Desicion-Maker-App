const express = require("express");
const cors = require("cors");
const pool = require('./db/dbConfig'); // Import your database pool
const cookieParser = require("cookie-parser");

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

app.post('/api/quick-save', async (req, res) => {
  let body = '';
  console.log("came");
/*
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { caseId, criteriaCards, products } = JSON.parse(body);
      console.log("came");
      console.log("Data:", caseId, criteriaCards?.length, products?.length);

      // await deleteCriterias(caseId);
      // await createCriterias(caseId, criteriaCards);
      // await insertMatrixContent(caseId, products);

      res.sendStatus(200);
    } catch (err) {
      console.error("Error parsing beacon payload:", err);
      res.sendStatus(400);
    }
  });
  */
});

/*
app.post('/api/quick-save', express.json(), async (req, res) => {
  //const { caseId, newCriterias, decisionMatrix } = req.body;

  console.log("came")
  
  
  try {
    if (newCriterias?.length) {
      await deleteCriterias(caseId);
      await createCriterias(caseId, newCriterias);
    }
    if (decisionMatrix?.length) {
      await insertMatrixContent(caseId, decisionMatrix);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error in quick save:", error);
    res.sendStatus(500);
  }
});
*/

/*
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/
const server = app.listen(port, () => {
  console.log(`Server running on render port:${port}`);
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