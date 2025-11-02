import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('/api/teams');
        setTeams(res.data.filter(team => team.approval_status === 'Pending'));
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchTeams();
  }, []);

  const approveTeam = async (id) => {
    try {
      await axios.put(`/api/teams/approve/${id}`, {}, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setTeams(teams.filter(t => t._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Approve Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <h3>{team.name}</h3>
            <button onClick={() => approveTeam(team._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveTeams;
