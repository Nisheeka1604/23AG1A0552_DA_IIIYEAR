import React, { useState } from 'react';
import axios from 'axios';

const CreateAnnouncement = ({ tournamentId }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  });

  const { title, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/announcements', { ...formData, tournament_id: tournamentId }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setFormData({ title: '', message: '' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h4>Create Announcement</h4>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Title" name="title" value={title} onChange={onChange} required />
        <textarea placeholder="Message" name="message" value={message} onChange={onChange} required />
        <input type="submit" value="Create Announcement" />
      </form>
    </div>
  );
};

export default CreateAnnouncement;
