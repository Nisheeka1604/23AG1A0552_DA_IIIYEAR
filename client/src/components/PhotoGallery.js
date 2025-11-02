import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = ({ tournamentId }) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`/api/media/tournament/${tournamentId}`);
        setMedia(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchMedia();
  }, [tournamentId]);

  return (
    <div>
      <h4>Photo Gallery</h4>
      <div className="photo-gallery">
        {media.map(item => (
          <img key={item._id} src={`/${item.url}`} alt="Tournament" />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
