const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const auth = require('../middleware/auth');

module.exports = function(io) {
    // Create a new announcement (Admin only)
    router.post('/', auth, async (req, res) => {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        try {
            const newAnnouncement = new Announcement({
                ...req.body,
                created_by: req.user.id
            });
            const announcement = await newAnnouncement.save();
            io.emit('new announcement', announcement);
            res.json(announcement);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // Get all announcements for a tournament
    router.get('/tournament/:tournamentId', async (req, res) => {
        try {
            const announcements = await Announcement.find({ tournament_id: req.params.tournamentId }).populate('created_by', 'name');
            res.json(announcements);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    return router;
}
