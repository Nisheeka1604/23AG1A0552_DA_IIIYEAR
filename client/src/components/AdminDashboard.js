import React, { useContext } from 'react';
import Tournaments from './Tournaments';
import ApproveTeams from './ApproveTeams';
import Schedule from './Schedule';
import MatchList from './MatchList';
import SpiritLeaderboard from './SpiritLeaderboard';
import Attendance from './Attendance';
import VisitorRegistration from './VisitorRegistration';
import Reports from './Reports';
import CreateAnnouncement from './CreateAnnouncement';
import Announcements from './Announcements';
import UploadPhoto from './UploadPhoto';
import PhotoGallery from './PhotoGallery';
import { TournamentContext } from '../context/TournamentContext';

const AdminDashboard = () => {
  const { selectedTournament } = useContext(TournamentContext);
  const selectedMatch = { _id: "MATCH_ID", team_a_id: {name: "Team A"}, team_b_id: { name: "Opponent Name" } }; // Simplified match object


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Tournaments />
      {selectedTournament && (
        <>
          <ApproveTeams />
          <Schedule tournamentId={selectedTournament} />
          <MatchList tournamentId={selectedTournament} />
          <Attendance match={selectedMatch} />
          <VisitorRegistration tournamentId={selectedTournament} />
          <Reports tournamentId={selectedTournament} />
          <CreateAnnouncement tournamentId={selectedTournament} />
          <Announcements tournamentId={selectedTournament} />
          <UploadPhoto tournamentId={selectedTournament} />
          <PhotoGallery tournamentId={selectedTournament} />
          <SpiritLeaderboard tournamentId={selectedTournament} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
