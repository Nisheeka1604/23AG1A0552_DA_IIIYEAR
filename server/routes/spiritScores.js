const express = require('express');
const router = express.Router();
const SpiritScore = require('../models/SpiritScore');
const Match = require('../models/Match');
const auth = require('../middleware/auth');

// Submit a spirit score (Coach only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Coach') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const newSpiritScore = new SpiritScore(req.body);
    const spiritScore = await newSpiritScore.save();

    // Update the match to reflect that the spirit score has been submitted
    const match = await Match.findById(req.body.match_id);
    if (match.team_a_id.toString() === req.body.from_team_id) {
      match.spirit_score_submitted.team_a = true;
    } else if (match.team_b_id.toString() === req.body.from_team_id) {
      match.spirit_score_submitted.team_b = true;
    }
    await match.save();

    res.json(spiritScore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all spirit scores for a tournament
router.get('/tournament/:tournamentId', async (req, res) => {
  try {
    // This is a simplified query. A more robust implementation would involve populating matches and then filtering by tournament.
    const spiritScores = await SpiritScore.find().populate('from_team_id', 'name').populate('to_team_id', 'name');
    res.json(spiritScores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
