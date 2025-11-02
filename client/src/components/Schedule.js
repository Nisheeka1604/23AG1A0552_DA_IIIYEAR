import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schedule = ({ tournamentId }) => {
  const [teams, setTeams] = useState([]);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    team_a_id: '',
    team_b_id: '',
    field_id: '',
    start_time: ''
  });

  useEffect(() => {
    const fetchTeamsAndFields = async () => {
      try {
        const teamsRes = await axios.get('/api/teams');
        const fieldsRes = await axios.get(`/api/fields/tournament/${tournamentId}`);
        setTeams(teamsRes.data);
        setFields(fieldsRes.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchTeamsAndFields();
  }, [tournamentId]);

  const { team_a_id, team_b_id, field_id, start_time } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/matches', { ...formData, tournament_id: tournamentId }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      // Refresh match list or update state
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <select name="team_a_id" value={team_a_id} onChange={onChange} required>
        <option value="">Select Team A</option>
        {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
      </select>
      <select name="team_b_id" value={team_b_id} onChange={onChange} required>
        <option value="">Select Team B</option>
        {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
      </select>
      <select name="field_id" value={field_id} onChange={onChange}>
        <option value="">Select Field</option>
        {fields.map(field => <option key={field._id} value={field._id}>{field.name}</option>)}
      </select>
      <input type="datetime-local" name="start_time" value={start_time} onChange={onChange} required />
      <input type="submit" value="Schedule Match" />
    </form>
  );
};

export default Schedule;
