const express = require('express');
const router = express.Router();
const { getDecisionMatrix, insertDecisionMatrix } = require('../db/dbFunctions');

router.get('/:caseId', async (req, res) => {
  try {
    const matrix = await getDecisionMatrix(req.params.caseId);
    res.status(200).json(matrix);
  } catch (err) {
    res.status(500).send('Error fetching decision matrix');
  }
});

router.post('/:criteriaId', async (req, res) => {
  try {
    const alternatives = req.body;
    await insertDecisionMatrix(req.params.criteriaId, alternatives);
    res.status(201).send('Decision matrix updated');
  } catch (err) {
    res.status(500).send('Error updating decision matrix');
  }
});

module.exports = router;

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

