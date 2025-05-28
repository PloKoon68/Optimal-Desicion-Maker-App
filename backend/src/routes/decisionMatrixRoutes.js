const express = require('express');
const router = express.Router();
const { getDecisionMatrix, insertDecisionMatrixEntity, insertDecionMatrixEntity } = require('../db/dbFunctions');

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
    const entity = req.body;
    await insertDecisionMatrixEntity(req.params.caseId, entity);
    res.status(201).send('Decision matrix updated');
  } catch (err) {
    console.log("err: ", err)
    res.status(500).send(err);
  }
});



module.exports = router;

