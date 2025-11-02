import React from 'react';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import CoachDashboard from './CoachDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwt_decode(token);
  const userRole = decoded.user.role;

  switch (userRole) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Coach':
      return <CoachDashboard />;
    case 'Student':
      return <StudentDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

export default Dashboard;
