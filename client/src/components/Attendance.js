import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = ({ match }) => {
  const [roster, setRoster] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchRosterAndAttendance = async () => {
      try {
        // This assumes the roster is for team A for simplicity
        const teamRes = await axios.get(`/api/teams/${match.team_a_id}`);
        setRoster(teamRes.data.roster);
        const attendanceRes = await axios.get(`/api/attendance/match/${match._id}`);
        const attendanceMap = attendanceRes.data.reduce((acc, record) => {
          acc[record.player_id._id] = record.present;
          return acc;
        }, {});
        setAttendance(attendanceMap);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchRosterAndAttendance();
  }, [match]);

  const markAttendance = async (playerId, isPresent) => {
    try {
      await axios.post('/api/attendance', { player_id: playerId, match_id: match._id, present: isPresent }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setAttendance({ ...attendance, [playerId]: isPresent });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h4>Attendance for {match.team_a_id.name}</h4>
      <ul>
        {roster.map(player => (
          <li key={player._id}>
            {player.name}
            <input type="checkbox" checked={attendance[player._id] || false} onChange={(e) => markAttendance(player._id, e.target.checked)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
