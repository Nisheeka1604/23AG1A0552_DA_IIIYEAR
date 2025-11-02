import React, { useState } from 'react';
import axios from 'axios';

const Player = ({ teamId }) => {
  const [playerName, setPlayerName] = useState('');

  const addPlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/players', { name: playerName, team_id: teamId }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      // Refresh player list or update state
      setPlayerName('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={addPlayer}>
      <input type="text" placeholder="Player Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
      <input type="submit" value="Add Player" />
    </form>
  );
};

export default Player;
