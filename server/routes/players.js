const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// Create a new player and add to a team (Coach only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Coach') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const newPlayer = new Player(req.body);
    const player = await newPlayer.save();

    // Add player to team's roster
    await Team.findByIdAndUpdate(req.body.team_id, { $push: { roster: player._id } });

    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('team_id', 'name');
    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
