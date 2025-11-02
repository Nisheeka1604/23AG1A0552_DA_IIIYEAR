import React, { useContext } from 'react';
import MatchList from './MatchList';
import SpiritLeaderboard from './SpiritLeaderboard';
import Announcements from './Announcements';
import PhotoGallery from './PhotoGallery';
import { TournamentContext } from '../context/TournamentContext';
import Tournaments from './Tournaments';


const StudentDashboard = () => {
  const { selectedTournament } = useContext(TournamentContext);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <Tournaments />
      {selectedTournament && (
        <>
          <MatchList tournamentId={selectedTournament} />
          <Announcements tournamentId={selectedTournament} />
          <PhotoGallery tournamentId={selectedTournament} />
          <SpiritLeaderboard tournamentId={selectedTournament} />
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
