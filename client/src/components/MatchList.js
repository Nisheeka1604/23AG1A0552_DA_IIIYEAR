import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const MatchList = ({ tournamentId }) => {
  const [matches, setMatches] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userTeamId, setUserTeamId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUserRole(decoded.user.role);
      // This is a placeholder for getting the user's team ID
      setUserTeamId("USER_TEAM_ID");
    }

    const fetchMatches = async () => {
      try {
        const res = await axios.get(`/api/matches/tournament/${tournamentId}`);
        setMatches(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchMatches();
  }, [tournamentId]);

  const updateScore = async (matchId, scoreA, scoreB, completed) => {
    try {
      await axios.put(`/api/matches/score/${matchId}`, { score: { team_a: scoreA, team_b: scoreB }, completed }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      // Refresh match list or update state
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const isSpiritScoreMissing = (match) => {
    if (!match.completed) return false;
    if (match.team_a_id._id === userTeamId && !match.spirit_score_submitted.team_a) return true;
    if (match.team_b_id._id === userTeamId && !match.spirit_score_submitted.team_b) return true;
    return false;
  };

  return (
    <div>
      <h3>Match Schedule</h3>
      <ul>
        {matches.map(match => (
          <li key={match._id} style={{ color: isSpiritScoreMissing(match) ? 'red' : 'black' }}>
            <p>{match.team_a_id.name} vs {match.team_b_id.name} at {new Date(match.start_time).toLocaleString()}</p>
            <p>Score: {match.score.team_a} - {match.score.team_b}</p>
            {userRole === 'Admin' && !match.completed && (
              <div>
                <input type="number" onChange={(e) => updateScore(match._id, e.target.value, match.score.team_b, false)} />
                <input type="number" onChange={(e) => updateScore(match._id, match.score.team_a, e.target.value, false)} />
                <button onClick={() => updateScore(match._id, match.score.team_a, match.score.team_b, true)}>Finalize</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
