import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const Reports = ({ tournamentId }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`/api/reports/summary/${tournamentId}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
        setSummary(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchSummary();
  }, [tournamentId]);

  const downloadReport = async (reportType) => {
    try {
      const res = await axios.get(`/api/reports/download/${tournamentId}/${reportType}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
        responseType: 'blob'
      });
      const blob = new Blob([res.data], { type: 'text/csv' });
      saveAs(blob, `${reportType}.csv`);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>Tournament Summary</h4>
      <p>Tournament: {summary.tournament.title}</p>
      <p>Teams: {summary.teams.length}</p>
      <p>Players: {summary.players.length}</p>
      <p>Matches: {summary.matches.length}</p>
      <h4>Download Reports</h4>
      <button onClick={() => downloadReport('matches')}>Matches</button>
      <button onClick={() => downloadReport('spirit')}>Spirit Scores</button>
      <button onClick={() => downloadReport('attendance')}>Attendance</button>
    </div>
  );
};

export default Reports;
