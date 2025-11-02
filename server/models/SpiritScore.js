const mongoose = require('mongoose');

const SpiritScoreSchema = new mongoose.Schema({
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  from_team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  to_team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  scores: {
    rules: { type: Number, min: 0, max: 4, required: true },
    contact: { type: Number, min: 0, max: 4, required: true },
    fairness: { type: Number, min: 0, max: 4, required: true },
    attitude: { type: Number, min: 0, max: 4, required: true },
    communication: { type: Number, min: 0, max: 4, required: true }
  },
  total_score: {
    type: Number,
    required: true
  },
  comments: {
    type: String
  }
});

const SpiritScore = mongoose.model('SpiritScore', SpiritScoreSchema);

module.exports = SpiritScore;
