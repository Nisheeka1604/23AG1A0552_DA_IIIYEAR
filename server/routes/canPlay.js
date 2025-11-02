const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Check if a team can play their next match
router.get('/can-play/:teamId', async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const matches = await Match.find({ $or: [{ team_a_id: teamId }, { team_b_id: teamId }] }).sort({ start_time: 1 });

    const lastCompletedMatch = matches.slice().reverse().find(match => match.completed);

    if (!lastCompletedMatch) {
      return res.json({ canPlay: true });
    }

    const isTeamA = lastCompletedMatch.team_a_id.toString() === teamId;
    const spiritScoreSubmitted = isTeamA ? lastCompletedMatch.spirit_score_submitted.team_a : lastCompletedMatch.spirit_score_submitted.team_b;

    res.json({ canPlay: spiritScoreSubmitted });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
