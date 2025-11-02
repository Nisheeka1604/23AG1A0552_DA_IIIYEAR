const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  rules: {
    type: String
  },
  dates: {
    start: Date,
    end: Date
  },
  location: {
    type: String
  },
  sponsors: [String],
  banner_url: {
    type: String
  },
  social_media: {
    youtube: String,
    instagram: String,
    facebook: String
  }
});

const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
