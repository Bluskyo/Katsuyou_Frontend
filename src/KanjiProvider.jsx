import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const KanjiContext = createContext();

// Create a provider component
export function KanjiProvider({ children }) {
  const [kanjiData, setKanjiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/random');
      const responseJson = await response.json();
      setKanjiData(responseJson);
      console.log(responseJson)
    };

    fetchData();
  }, []);

  return (
    <KanjiContext.Provider value={kanjiData}>
      {children}
    </KanjiContext.Provider>
  );
}


export default KanjiProvider;