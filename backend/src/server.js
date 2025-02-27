

const { getDecisionMatrix,insertDecisionMatrix, 
        getCriteriasByCaseId, deleteCriteriasByCaseId,
        insertCriterias, runQuery } = require("./db/dbFunctions");

        const express = require("express");
const cors = require("cors");

const casesRoutes = require('./routes/casesRoutes');
const criteriasRoutes = require('./routes/criteriasRoutes');
const decisionMatrixRoutes = require('./routes/decisionMatrixRoutes');


/*
/project-root
│
├── /db
│   ├── dbConnection.js
│   ├── dbFunctions.js
│
├── /routes
│   ├── casesRoutes.js
│   ├── criteriasRoutes.js
│   ├── decisionMatrixRoutes.js
│
├── /utils
│   └── errorHandler.js
│
├── /app
│   └── server.js
│
├── .env
├── package.json
└── README.md

*/

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({  
  origin: "http://localhost:3000",  // Allow frontend to access backend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json())

app.use('/api/cases', casesRoutes);
app.use('/api/criterias', criteriasRoutes);
app.use('/api/decisionMatrix', decisionMatrixRoutes);












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