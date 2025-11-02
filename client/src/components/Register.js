import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
      <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
      <select name="role" value={role} onChange={onChange}>
        <option value="Student">Student</option>
        <option value="Coach">Coach</option>
        <option value="Admin">Admin</option>
      </select>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
