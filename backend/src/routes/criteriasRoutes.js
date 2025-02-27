const express = require('express');
const router = express.Router();
const { getCriteriasByCaseId, deleteCriteriasByCaseId, insertCriterias, runQuery } = require('../db/dbFunctions');


//criterias api calls
router.get('/:caseId', async (req, res) => {
  const criterias = await getCriteriasByCaseId(req.params.caseId);
  console.log("hebele")
  try {
    res.status(200).json(criterias);
  } catch (err) {
    res.status(500).send('Error fetching criterias');
  }
});

router.delete('/:caseId', async (req, res) => { 
  try {
    await deleteCriteriasByCaseId(req.params.caseId);
    res.status(200).send(`Criterias deleted at case with id ${req.params.caseId}`);
  } catch (err) {
    console.log("ee is: ", err)
    res.status(500).send(`Error deleting criterias: ${err.detail}`);
  }
});

router.post('/:caseId', async (req, res) => {
  try {
    // 1️⃣ Check if the case exists
    const caseCheckResult = await runQuery(`SELECT * FROM cases WHERE case_id = $1`, [req.params.caseId]);
    
    if (!caseCheckResult.rowCount) {
      return res.status(404).send('Case not found');
    }
    await insertCriterias(req.params.caseId, req.body);
    res.status(201).send('Criterias added');
  } catch (err) {
    res.status(500).send({"error is: ": err});
  }
});

  module.exports = router;
