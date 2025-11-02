import React, { useState } from 'react';
import axios from 'axios';

const UploadPhoto = ({ tournamentId }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media', file);
    formData.append('tournament_id', tournamentId);
    formData.append('type', 'photo');

    try {
      await axios.post('/api/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      // Handle successful upload
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h4>Upload Photo</h4>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
    </div>
  );
};

export default UploadPhoto;
