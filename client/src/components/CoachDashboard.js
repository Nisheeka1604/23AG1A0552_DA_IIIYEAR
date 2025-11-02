import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Team from './Team';
import MatchList from './MatchList';
import SpiritScoreForm from './SpiritScoreForm';
import SpiritLeaderboard from './SpiritLeaderboard';
import Attendance from './Attendance';
import Announcements from './Announcements';
import UploadPhoto from './UploadPhoto';
import PhotoGallery from './PhotoGallery';
import { TournamentContext } from '../context/TournamentContext';

const CoachDashboard = () => {
  const [canPlay, setCanPlay] = useState(true);
  const { selectedTournament } = useContext(TournamentContext);
  const userTeamId = "USER_TEAM_ID";
  // This would be fetched from the API
  const matches = [
    { _id: "MATCH_ID_1", team_a_id: {name: "Team A"}, team_b_id: { name: "Opponent 1" }, completed: true, spirit_score_submitted: { team_a: false } },
    { _id: "MATCH_ID_2", team_a_id: {name: "Team A"}, team_b_id: { name: "Opponent 2" }, completed: false }
  ];

  useEffect(() => {
    const checkCanPlay = async () => {
      try {
        const res = await axios.get(`/api/can-play/${userTeamId}`);
        setCanPlay(res.data.canPlay);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    checkCanPlay();
  }, [userTeamId]);

  return (
    <div>
      <h1>Coach Dashboard</h1>
      <Team />
      {selectedTournament && (
        <>
          <MatchList tournamentId={selectedTournament} />
          {matches.map(match => (
            <div key={match._id}>
              {match.completed ?
                !match.spirit_score_submitted.team_a && <SpiritScoreForm match={match} /> :
                <Attendance match={match} disabled={!canPlay} />
              }
            </div>
          ))}
          <Announcements tournamentId={selectedTournament} />
          <UploadPhoto tournamentId={selectedTournament} />
          <PhotoGallery tournamentId={selectedTournament} />
          <SpiritLeaderboard tournamentId={selectedTournament} />
        </>
      )}
    </div>
  );
};

export default CoachDashboard;
