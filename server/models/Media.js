const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  tournament_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  }
});

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;
