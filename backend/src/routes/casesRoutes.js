const express = require('express');
const router = express.Router();
const { getCases, getCaseById, createCase, updateCase, deleteCase } = require('../db/dbFunctions');

router.get('/', async (req, res) => {
    try {
      const result = await getCases();
      
      res.status(200).json(result);
    } catch (err) {
      console.log("err is: ", err)
      res.status(500).send('Error fetching cases');
    }
  });
  
  
  // GET a specific case by ID
  router.get('/:id', async (req, res) => {
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
  router.post('/', async (req, res) => {
    const { title, description } = req.body; // assuming the case has a description
    try {
      const createdRow = await createCase(title, description);
      res.status(201).json(createdRow);  // Return the created case
    } catch (err) {
      res.status(500).send('Error creating case');
    }
  });
  
  // PUT update an existing case by ID
  router.put('/:id', async (req, res) => {
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
  router.delete('/:id', async (req, res) => {
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

  module.exports = router;
