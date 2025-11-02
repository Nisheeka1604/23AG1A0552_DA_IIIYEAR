import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';

const Team = () => {
  const [team, setTeam] = useState(null);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get('/api/teams', { headers: { 'x-auth-token': localStorage.getItem('token') } });
        // This needs to be improved to find the coach's specific team
        const userTeams = res.data.filter(t => t.coach_id._id === jwt_decode(localStorage.getItem('token')).user.id)
        setTeam(userTeams[0]);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchTeam();
  }, []);

  const createTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/teams', { name: teamName }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setTeam(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!team) {
    return (
      <form onSubmit={createTeam}>
        <input type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
        <input type="submit" value="Create Team" />
      </form>
    );
  }

  return (
    <div>
      <h2>{team.name}</h2>
      <Player teamId={team._id} />
      <h3>Roster</h3>
      <ul>
        {team.roster.map(player => (
          <li key={player._id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
