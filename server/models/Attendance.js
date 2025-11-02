const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  player_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  present: {
    type: Boolean,
    default: false
  }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
