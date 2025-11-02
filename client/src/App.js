import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TournamentForm from './components/TournamentForm';
import TournamentDetails from './components/TournamentDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-tournament" element={
            <ProtectedRoute>
              <TournamentForm />
            </ProtectedRoute>
          } />
          <Route path="/edit-tournament/:id" element={
            <ProtectedRoute>
              <TournamentForm />
            </ProtectedRoute>
          } />
          <Route path="/tournament/:id" element={<TournamentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
