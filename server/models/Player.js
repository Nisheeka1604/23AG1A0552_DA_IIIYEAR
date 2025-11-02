const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  age: {
    type: Number
  },
  jersey_number: {
    type: Number
  },
  experience: {
    type: String
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
