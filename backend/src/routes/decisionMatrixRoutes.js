const express = require('express');
const router = express.Router();
const { getDecisionMatrix, insertDecisionMatrixEntity, deleteDecisionMatrixEntity } = require('../db/dbFunctions');

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

router.delete('/:caseId/:alternativeName', async (req, res) => {
  console.log("caa", req.params.caseId, req.params.alternativeName)
  try {
    //console.log("s: ", req.params.caseId, res.body.alternativeName)
    await deleteDecisionMatrixEntity(req.params.caseId, req.params.alternativeName);
    res.status(200).send("Alternative deleted");
  } catch (err) {
    console.log(err)
    res.status(500).send('Error deleting case');
  }
});



module.exports = router;

