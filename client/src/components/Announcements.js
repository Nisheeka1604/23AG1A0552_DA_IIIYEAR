import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const Announcements = ({ tournamentId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(`/api/announcements/tournament/${tournamentId}`);
        setAnnouncements(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchAnnouncements();

    const socket = socketIOClient(ENDPOINT);
    socket.on("new announcement", data => {
      setAnnouncements(prevAnnouncements => [data, ...prevAnnouncements]);
    });

    return () => socket.disconnect();
  }, [tournamentId]);

  return (
    <div>
      <h4>Announcements</h4>
      <ul>
        {announcements.map(announcement => (
          <li key={announcement._id}>
            <h5>{announcement.title}</h5>
            <p>{announcement.message}</p>
            <small>by {announcement.created_by.name} at {new Date(announcement.date_time).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
