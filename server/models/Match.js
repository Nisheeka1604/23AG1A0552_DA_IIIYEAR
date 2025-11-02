const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  tournament_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  field_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field'
  },
  team_a_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  team_b_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  score: {
    team_a: { type: Number, default: 0 },
    team_b: { type: Number, default: 0 }
  },
  completed: {
    type: Boolean,
    default: false
  },
  spirit_score_submitted: {
    team_a: { type: Boolean, default: false },
    team_b: { type: Boolean, default: false }
  }
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
