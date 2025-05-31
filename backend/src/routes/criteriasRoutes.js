const express = require('express');
const router = express.Router();
const { getCriteriasByCaseId, deleteCriteriasByCaseId, insertCriterias, insertCriteria, runQuery } = require('../db/dbFunctions');

/*
        criteriaName
        dataType
        characteristic
        criteriaPoint
*/
//criterias api calls
router.get('/:caseId', async (req, res) => {
  const criterias = await getCriteriasByCaseId(req.params.caseId);
  try {
    res.status(200).json(criterias);
  } catch (err) {
    res.status(500).send('Error fetching criterias');
  }
});

/*
router.delete('/:caseId', async (req, res) => { 
  try {
    console.log("dd")
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
    const caseCheckResult = await runQuery(`SELECT * FROM cases WHERE "caseId" = $1`, [req.params.caseId]);
    
    if (!caseCheckResult.rowCount) {
      return res.status(404).send('Case not found');
    }
    await insertCriterias(req.params.caseId, req.body);
    res.status(201).send('Criterias added');
  } catch (err) {
    res.status(500).send({"error is: ": err});
  }
});

*/

router.post('/:caseId', async (req, res) => {
  try {
    // 1️⃣ Check if the case exists
    const caseCheckResult = await runQuery(`SELECT * FROM cases WHERE "caseId" = $1`, [req.params.caseId]);
    
    if (!caseCheckResult.rowCount) {
      return res.status(404).send('Case not found');
    }
    const criteriaId = await insertCriteria(req.params.caseId, req.body);
    
    res.status(201).json(criteriaId);
  } catch (err) {
    res.status(500).send({"error is: ": err});
  }
});


router.put('/:criteriaId', async (req, res) => {
  const { criteriaId } = req.params;
  const { criteriaName, dataType, characteristic, criteriaPoint } = req.body;

  try {
    // Optional: Verify the case and criteria exist
    const result = await runQuery(
      `UPDATE criterias
       SET "criteriaName" = $1,
           "dataType" = $2,
           characteristic = $3,
           "criteriaPoint" = $4
       WHERE "criteriaId" = $5`,
      [criteriaName, dataType, characteristic, criteriaPoint, criteriaId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Criteria not found or no changes made." });
    }

    res.status(200).json({ message: "Criteria updated successfully." });
  } catch (err) {
    console.error("Error updating criteria:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete('/:criteriaId', async (req, res) => {
  const { criteriaId } = req.params;
  const criteriaName = req.body.criteriaName;

  try {
    const result = await runQuery(`DELETE FROM criterias WHERE "criteriaId" = $1`, [criteriaId]);
    await runQuery(`DELETE FROM decisionmatrix WHERE "criteriaName" = $1`, [criteriaName]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Criteria not found." });
    }

    res.status(200).json({ message: "Criteria deleted successfully." });
  } catch (err) {
    console.error("Error deleting criteria:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});



  module.exports = router;
