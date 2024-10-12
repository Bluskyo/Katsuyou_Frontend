import React, { useState, useEffect } from 'react';
import KanjiInfo from './KanjiInfo.jsx';
import Settings from './Settings.jsx';
import Guess from './Guess.jsx';

import getConjugation from './methods/getConjugations.js';

export function KanjiProvider() {
  const [kanjiData, setKanjiData] = useState(null);
  const [conjugationData, setConjugationData] = useState(null);
  const [guess, setGuess] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/random');
      const responseJson = await response.json();
      setKanjiData(responseJson);
      setConjugationData(getConjugation(responseJson, setConjugationData))

      console.log(responseJson)
    };

    fetchData();
  }, []);

  return (
    <div>
      <KanjiInfo kanjiData={kanjiData} conjugationData={conjugationData} setConjugationData={setConjugationData}/>
      <Guess guessInput={guess} setGuess={setGuess}/>
      <Settings kanjiData={kanjiData} setConjugationData={setConjugationData}/>
    </div>
  );
}


export default KanjiProvider;