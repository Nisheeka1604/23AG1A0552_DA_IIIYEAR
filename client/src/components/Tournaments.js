import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../context/TournamentContext';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const { setSelectedTournament } = useContext(TournamentContext);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get('/api/tournaments');
        setTournaments(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchTournaments();
  }, []);

  const deleteTournament = async (id) => {
    try {
      await axios.delete(`/api/tournaments/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setTournaments(tournaments.filter(t => t._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Tournaments</h2>
      <Link to="/create-tournament">Create Tournament</Link>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament._id} onClick={() => setSelectedTournament(tournament._id)}>
            <h3><Link to={`/tournament/${tournament._id}`}>{tournament.title}</Link></h3>
            <p>{tournament.description}</p>
            <Link to={`/edit-tournament/${tournament._id}`}>Edit</Link>
            <button onClick={() => deleteTournament(tournament._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tournaments;
