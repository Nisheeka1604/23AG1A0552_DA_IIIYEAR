import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TournamentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rules: '',
    location: '',
    social_media: {
      youtube: '',
      instagram: '',
      facebook: ''
    }
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTournament = async () => {
        try {
          const res = await axios.get(`/api/tournaments/${id}`);
          setFormData(res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      };
      fetchTournament();
    }
  }, [id]);

  const { title, description, rules, location, social_media } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSocialChange = e => setFormData({ ...formData, social_media: { ...social_media, [e.target.name]: e.target.value } });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      };
      if (id) {
        await axios.put(`/api/tournaments/${id}`, formData, config);
      } else {
        await axios.post('/api/tournaments', formData, config);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Title" name="title" value={title} onChange={onChange} required />
      <textarea placeholder="Description" name="description" value={description} onChange={onChange} required />
      <textarea placeholder="Rules" name="rules" value={rules} onChange={onChange} />
      <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
      <input type="text" placeholder="YouTube" name="youtube" value={social_media ? social_media.youtube : ''} onChange={onSocialChange} />
      <input type="text" placeholder="Instagram" name="instagram" value={social_media ? social_media.instagram : ''} onChange={onSocialChange} />
      <input type="text" placeholder="Facebook" name="facebook" value={social_media ? social_media.facebook : ''} onChange={onSocialChange} />
      <input type="submit" value={id ? 'Update Tournament' : 'Create Tournament'} />
    </form>
  );
};

export default TournamentForm;
