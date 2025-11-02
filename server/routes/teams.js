const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// Create a new team (Coach only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Coach') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const newTeam = new Team({
      ...req.body,
      coach_id: req.user.id
    });
    const team = await newTeam.save();
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('coach_id', 'name').populate('roster');
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('coach_id', 'name').populate('roster');
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Approve a team (Admin only)
router.put('/approve/:id', auth, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, { approval_status: 'Approved' }, { new: true });
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
