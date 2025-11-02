import React, { createContext, useState } from 'react';

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
  const [selectedTournament, setSelectedTournament] = useState(null);

  return (
    <TournamentContext.Provider value={{ selectedTournament, setSelectedTournament }}>
      {children}
    </TournamentContext.Provider>
  );
};
