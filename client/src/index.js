import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TournamentProvider } from './context/TournamentContext';

ReactDOM.render(
  <React.StrictMode>
    <TournamentProvider>
      <App />
    </TournamentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
