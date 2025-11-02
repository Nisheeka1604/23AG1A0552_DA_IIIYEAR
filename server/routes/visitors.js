const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const auth = require('../middleware/auth');

// Register a new visitor (Admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const newVisitor = new Visitor(req.body);
    const visitor = await newVisitor.save();
    res.json(visitor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all visitors for a tournament
router.get('/tournament/:tournamentId', auth, async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
  try {
    const visitors = await Visitor.find({ tournament_id: req.params.tournamentId });
    res.json(visitors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
