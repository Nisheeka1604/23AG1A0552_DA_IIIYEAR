const express = require('express');
const router = express.Router();
const multer = require('multer');
const Media = require('../models/Media');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Upload media (Admin or Coach)
router.post('/', auth, upload.single('media'), async (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Coach') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        const newMedia = new Media({
            tournament_id: req.body.tournament_id,
            url: req.file.path,
            uploader_id: req.user.id,
            type: req.body.type
        });
        const media = await newMedia.save();
        res.json(media);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all media for a tournament
router.get('/tournament/:tournamentId', async (req, res) => {
    try {
        const media = await Media.find({ tournament_id: req.params.tournamentId });
        res.json(media);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
