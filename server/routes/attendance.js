const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

// Mark attendance (Coach or Admin)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Coach' && req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const { player_id, match_id, present } = req.body;
    let attendance = await Attendance.findOne({ player_id, match_id });
    if (attendance) {
      attendance.present = present;
    } else {
      attendance = new Attendance({ player_id, match_id, present });
    }
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get attendance for a match
router.get('/match/:matchId', async (req, res) => {
  try {
    const attendance = await Attendance.find({ match_id: req.params.matchId }).populate('player_id', 'name');
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
