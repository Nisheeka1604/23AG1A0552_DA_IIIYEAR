import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitorRegistration = ({ tournamentId }) => {
  const [visitors, setVisitors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get(`/api/visitors/tournament/${tournamentId}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
        setVisitors(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchVisitors();
  }, [tournamentId]);

  const { name, email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/visitors', { ...formData, tournament_id: tournamentId }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      // Refresh visitor list
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h4>Visitor Registration</h4>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        <input type="submit" value="Register Visitor" />
      </form>
      <h4>Registered Visitors</h4>
      <ul>
        {visitors.map(visitor => (
          <li key={visitor._id}>{visitor.name} ({visitor.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorRegistration;
