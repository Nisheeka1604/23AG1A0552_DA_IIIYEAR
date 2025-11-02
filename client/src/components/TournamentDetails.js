import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TournamentDetails = () => {
  const [tournament, setTournament] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axios.get(`/api/tournaments/${id}`);
        setTournament(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchTournament();
  }, [id]);

  if (!tournament) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{tournament.title}</h2>
      <p>{tournament.description}</p>
      <p>{tournament.rules}</p>
      <p>{tournament.location}</p>
      <div>
        {tournament.social_media && tournament.social_media.youtube && <a href={tournament.social_media.youtube}>YouTube</a>}
        {tournament.social_media && tournament.social_media.instagram && <a href={tournament.social_media.instagram}>Instagram</a>}
        {tournament.social_media && tournament.social_media.facebook && <a href={tournament.social_media.facebook}>Facebook</a>}
      </div>
    </div>
  );
};

export default TournamentDetails;
