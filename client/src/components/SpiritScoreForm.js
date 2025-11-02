import React, { useState } from 'react';
import axios from 'axios';

const SpiritScoreForm = ({ match }) => {
  const [formData, setFormData] = useState({
    rules: 2,
    contact: 2,
    fairness: 2,
    attitude: 2,
    communication: 2,
    comments: ''
  });

  const { rules, contact, fairness, attitude, communication, comments } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const total_score = parseInt(rules) + parseInt(contact) + parseInt(fairness) + parseInt(attitude) + parseInt(communication);
    const spiritScoreData = {
      match_id: match._id,
      from_team_id: match.team_a_id, // This needs to be the coach's team
      to_team_id: match.team_b_id,   // This needs to be the opponent
      scores: { rules, contact, fairness, attitude, communication },
      total_score,
      comments
    };
    try {
      await axios.post('/api/spirit-scores', spiritScoreData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      // Handle successful submission
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h4>Spirit Score for {match.team_b_id.name}</h4>
      <div><label>Rules Knowledge and Use</label><input type="range" name="rules" min="0" max="4" value={rules} onChange={onChange} /></div>
      <div><label>Fouls and Body Contact</label><input type="range" name="contact" min="0" max="4" value={contact} onChange={onChange} /></div>
      <div><label>Fair-Mindedness</label><input type="range" name="fairness" min="0" max="4" value={fairness} onChange={onChange} /></div>
      <div><label>Positive Attitude and Self-Control</label><input type="range" name="attitude" min="0" max="4" value={attitude} onChange={onChange} /></div>
      <div><label>Communication</label><input type="range"name="communication" min="0" max="4" value={communication} onChange={onChange} /></div>
      <textarea placeholder="Comments" name="comments" value={comments} onChange={onChange} />
      <input type="submit" value="Submit Spirit Score" />
    </form>
  );
};

export default SpiritScoreForm;
