import React, { useContext } from 'react';
import { KanjiContext } from './KanjiProvider';

function KanjiInfo() {
  const data = useContext(KanjiContext);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {data.hiragana}<br />
        {data.kanji}<br />
      </h2>
      <h3>{data.meaning}</h3>     
    </div>
  );
}

export default KanjiInfo;
