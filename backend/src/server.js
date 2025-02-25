

const { getDecisionMatrix,insertDecisionMatrix, 
        getCriteriasByCaseId, deleteCriteriasByCaseId,
        insertCriterias, runQuery } = require("./db/dbFunctions");

        const express = require("express");
const cors = require("cors");
const casesRoutes = require('./routes/casesRoutes');
const criteriasRoutes = require('./routes/criteriasRoutes');


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


/*
app.get('/api/cases', async (req, res) => {
  try {
    const result = await getCases();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Error fetching cases');
  }
});


// GET a specific case by ID
app.get('/api/cases/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getCaseById(id);
    if (!result) {
      return res.status(404).send('Case not found');
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Error fetching case');
  }
});


// POST create a new case
app.post('/api/cases', async (req, res) => {
  const { title, description } = req.body; // assuming the case has a description
  try {
    const createdRow = await createCase(title, description);
    res.status(201).json(createdRow);  // Return the created case
  } catch (err) {
    res.status(500).send('Error creating case');
  }
});

// PUT update an existing case by ID
app.put('/api/cases/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedCase = await updateCase(id, title, description);
    if (!updatedCase) {
      return res.status(404).send('Case not found');
    }
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(500).send('Error updating case');
  }
});

// DELETE a case by ID
app.delete('/api/cases/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCase = await deleteCase(id);
    if (!deletedCase) {
      return res.status(404).send('Case not found');
    }
    res.status(200).send(`Case with id ${id} deleted`);
  } catch (err) {
    res.status(500).send('Error deleting case');
  }
});



*/
app.use('/api/cases', casesRoutes);
app.use('/api/criterias', criteriasRoutes);

/*
//criterias api calls
app.get('/api/cases/:caseId/criterias', async (req, res) => {
  const criterias = await getCriteriasByCaseId(req.params.caseId);
  console.log(criterias)
  try {
    res.status(200).json(criterias);
  } catch (err) {
    res.status(500).send('Error fetching criterias');
  }
});

app.delete('/api/cases/:caseId/criterias', async (req, res) => {
  try {
    await deleteCriteriasByCaseId(req.params.caseId);
    res.status(200).send(`Criterias deleted at case with id ${req.params.caseId}`);
  } catch (err) {
    console.log("ee is: ", err)
    res.status(500).send(`Error deleting criterias: ${err.detail}`);
  }
});

app.post('/api/cases/:caseId/criterias', async (req, res) => {
  try {
    // 1️⃣ Check if the case exists
    const caseCheckResult = await runQuery(`SELECT * FROM cases WHERE case_id = $1`, [req.params.caseId]);
    
    if (!caseCheckResult.rowCount) {
      return res.status(404).send('Case not found');
    }
    await insertCriterias(req.params.caseId, req.body);
    res.status(201).send('Criterias added');
  } catch (err) {
    res.status(500).send('Error inserting criterias');
  }
});

*/

//decision matrix api calls

app.get('/api/cases/:caseId/decision-matrix', async (req, res) => {
  try {
    const decisionMatrix = await getDecisionMatrix(req.params.caseId);
    
    res.status(200).json(decisionMatrix);
  } catch (err) {
    console.error('Error fetching decision matrix:', err);
    res.status(500).send('Error fetching decision matrix: ',err.detail);
  }
});

app.post('/api/cases/:caseId/criterias/:criteriaId/decisionmatrix', async (req, res) => {
  console.log(req.body)
  try {
    await insertDecisionMatrix(req.params.criteriaId, req.body);
    res.status(201).send(`Alternative values for criteria_id ${req.params.criteriaId} was added successfully`);
  } catch (err) {
    if (err.code === '23505') {  // PostgreSQL duplicate key error
      return res.status(400).send('Alternative name already exists for this criteria');
    }
    res.status(500).send(err.detail);
  }
});

/*
app.delete('/api/cases/:caseId/decision-matrix', async (req, res) => {
  try {
    const caseId = req.params.caseId;
    await deleteDecisionMatrix(caseId);
    res.status(200).send('Decision matrix deleted successfully');
  } catch (err) {
    console.error('Error deleting decision matrix:', err);
    res.status(500).send('Error deleting decision matrix');
  }
});*/











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