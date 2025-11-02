const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const auth = require('../middleware/auth');

// Create a new match (Admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const newMatch = new Match(req.body);
    const match = await newMatch.save();
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all matches for a tournament
router.get('/tournament/:tournamentId', async (req, res) => {
  try {
    const matches = await Match.find({ tournament_id: req.params.tournamentId }).populate('team_a_id', 'name').populate('team_b_id', 'name').populate('field_id', 'name');
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a match score (Admin or Volunteer)
router.put('/score/:id', auth, async (req, res) => {
  // Add volunteer role check if implemented
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, { score: req.body.score, completed: req.body.completed }, { new: true });
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
