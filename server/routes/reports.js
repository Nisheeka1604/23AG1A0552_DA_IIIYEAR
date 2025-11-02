const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const SpiritScore = require('../models/SpiritScore');
const Attendance = require('../models/Attendance');
const { Parser } = require('json2csv');
const auth = require('../middleware/auth');

// Get tournament summary (Admin only)
router.get('/summary/:tournamentId', auth, async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        const tournamentId = req.params.tournamentId;
        const tournament = await Tournament.findById(tournamentId);
        const teams = await Team.find({ tournaments: tournamentId });
        const players = await Player.find({ 'tournaments.tournament_id': tournamentId });
        const matches = await Match.find({ tournament_id: tournamentId });
        // Add more stats as needed
        res.json({ tournament, teams, players, matches });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Download reports (Admin only)
router.get('/download/:tournamentId/:reportType', auth, async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        const tournamentId = req.params.tournamentId;
        const reportType = req.params.reportType;
        let data;
        let fields;

        switch (reportType) {
            case 'matches':
                data = await Match.find({ tournament_id: tournamentId }).populate('team_a_id', 'name').populate('team_b_id', 'name');
                fields = ['team_a_id.name', 'team_b_id.name', 'score.team_a', 'score.team_b', 'start_time', 'completed'];
                break;
            case 'spirit':
                data = await SpiritScore.find().populate('from_team_id', 'name').populate('to_team_id', 'name');
                fields = ['from_team_id.name', 'to_team_id.name', 'total_score', 'comments'];
                break;
            case 'attendance':
                data = await Attendance.find().populate('player_id', 'name').populate('match_id');
                fields = ['player_id.name', 'match_id.start_time', 'present'];
                break;
            default:
                return res.status(400).json({ msg: 'Invalid report type' });
        }

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
        res.header('Content-Type', 'text/csv');
        res.attachment(`${reportType}.csv`);
        res.send(csv);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
