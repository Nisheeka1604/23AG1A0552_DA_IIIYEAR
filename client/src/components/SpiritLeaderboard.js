import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpiritLeaderboard = ({ tournamentId }) => {
  const [spiritScores, setSpiritScores] = useState([]);

  useEffect(() => {
    const fetchSpiritScores = async () => {
      try {
        const res = await axios.get(`/api/spirit-scores/tournament/${tournamentId}`);
        // This needs to be processed to aggregate scores per team
        setSpiritScores(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchSpiritScores();
  }, [tournamentId]);

  // Aggregate scores
  const teamScores = spiritScores.reduce((acc, score) => {
    const teamName = score.to_team_id.name;
    if (!acc[teamName]) {
      acc[teamName] = { total: 0, count: 0 };
    }
    acc[teamName].total += score.total_score;
    acc[teamName].count++;
    return acc;
  }, {});

  const leaderboard = Object.entries(teamScores).map(([teamName, data]) => ({
    teamName,
    average: data.total / data.count
  })).sort((a, b) => b.average - a.average);

  return (
    <div>
      <h3>Spirit Leaderboard</h3>
      <ol>
        {leaderboard.map(item => (
          <li key={item.teamName}>{item.teamName}: {item.average.toFixed(2)}</li>
        ))}
      </ol>
    </div>
  );
};

export default SpiritLeaderboard;
