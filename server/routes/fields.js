const express = require('express');
const router = express.Router();
const Field = require('../models/Field');
const auth = require('../middleware/auth');

// Create a new field (Admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const newField = new Field(req.body);
    const field = await newField.save();
    res.json(field);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all fields for a tournament
router.get('/tournament/:tournamentId', async (req, res) => {
  try {
    const fields = await Field.find({ tournament_id: req.params.tournamentId });
    res.json(fields);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
