import React, { useState, useEffect, createContext } from 'react';

import KanjiInfo from './KanjiInfo.jsx';
import Settings from './Settings.jsx';
import Guess from './Guess.jsx';

import getConjugation from './methods/getConjugations.js';

// global context for settings.
export const SettingsContext = createContext();

export function KanjiProvider() {
  const [kanjiData, setKanjiData] = useState(null);
  const [conjugationData, setConjugationData] = useState(null);

  const [guess, setGuess] = useState("");
  const [TriggerGuess, setTriggerGuess] = useState("");

  // appearance settings
  const [furiganaToggle, setFuriganaToggle] = useState(true);
  const [streakToggle, setStreakToggle] = useState(true);
  const [triesToggle, setTriesToggle] = useState(true);

    // default settings
    const [settings, setSettings] = useState({
      affirmative : true,
      negative: false,
      formal: false,
      informal: true, 
      present: false,
      past: true,
      teForm: false,
      potential: false,
      volitional: false,
      passive: false,
      causative: false,
      causativePassive: false,
      imperative: false,
      conditional: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/頑張る');
      const responseJson = await response.json();

      setKanjiData(responseJson);
      setConjugationData(getConjugation(responseJson, setConjugationData, settings));
    };

    fetchData();
  }, [TriggerGuess]);

  return (
    <div>
      <KanjiInfo kanjiData={kanjiData} conjugationData={conjugationData} furiganaToggle={furiganaToggle}/>

      <Guess guess={guess} setGuess={setGuess} setTriggerGuess={setTriggerGuess} conjugationData={conjugationData}
      streakToggle={streakToggle} triesToggle={triesToggle} kanjiData={kanjiData}/>

      <SettingsContext.Provider value={[settings, setSettings]}>
        <Settings kanjiData={kanjiData} setConjugationData={setConjugationData} setFuriganaToggle={setFuriganaToggle}
        setStreakToggle={setStreakToggle} setTriesToggle={setTriesToggle}/>
      </SettingsContext.Provider>
    </div>
  );
}


export default KanjiProvider;