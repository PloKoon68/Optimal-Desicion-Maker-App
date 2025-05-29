const express = require('express');
const router = express.Router();
const { getDecisionMatrix, insertDecisionMatrixEntity, editDecisionMatrixEntity, deleteDecisionMatrixEntities } = require('../db/dbFunctions');

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

router.put('/:caseId', async (req, res) => {
  try {
    const updatedEntity = req.body;
    console.log("recieved input edt: ", updatedEntity)
    await editDecisionMatrixEntity(req.params.caseId, updatedEntity);
    res.status(201).send('Decision matrix updated');
  } catch (err) {
    console.log("err: ", err)
    res.status(500).send(err);
  }
});

router.delete('/:caseId', async (req, res) => {
  const { caseId } = req.params;
  const { deleteAlternativeNames } = req.body
  try {
    await deleteDecisionMatrixEntities(caseId, deleteAlternativeNames);
    res.status(200).send("Alternative deleted");
  } catch (err) {
    console.log(err)
    res.status(500).send('Error deleting case');
  }
});



module.exports = router;

