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

router.post('/:caseId', async (req, res) => {
  try {
    const products = req.body;
    await insertDecisionMatrix(req.params.caseId, products);
    res.status(201).send('Decision matrix updated');
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;

