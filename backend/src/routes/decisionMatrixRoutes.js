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

/*

{alternativeName: 'asd', asd: 32, as: 1, id: '6NzON'}
1
: 
{alternativeName: 'ds', asd: 44, as: 54, id: 'DPKRM'}
2
: 
{alternativeName: '2d', asd: 23, as: 66, id: 'kyhah'}
*/

module.exports = router;

