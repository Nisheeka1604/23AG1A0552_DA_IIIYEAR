const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  coach_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roster: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  approval_status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
