const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tournament_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  schedule: {
    type: String // Or could be a more complex object/array
  }
});

const Field = mongoose.model('Field', FieldSchema);

module.exports = Field;
