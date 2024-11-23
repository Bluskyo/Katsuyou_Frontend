import  getFurigana  from './methods/getFurigana.jsx';

function KanjiInfo(props) {
const data = props.kanjiData;
const conjugationData = props.conjugationData;
// const furiganaToggle = props.furiganaToggle;

if (!data || !conjugationData) {
  return (
    <div>
      <p className="word">
        <ruby>
            Loading...
            <rt>Loading</rt>
          </ruby>
      </p>
      <p className="translation">Loading...</p>  
      <p className="conjugation-info">Loading...</p>
    </div>
  );
}

  // Limit gloss/meaning to only have 3 meanings.
  const translation = data.gloss.split(", ").slice(0, 3).join(", ");

  // Incase of more readings chooses first one.
  const reading = data.reading.split(", ")[0];

  const word = getFurigana(data.entry, reading);

  return (
    <div>
      <p className="word">{word}</p>
      <p className="translation">{translation}</p>  
      <p className="conjugation-info">{conjugationData.tense} {conjugationData.formality} {conjugationData.assertion}</p>
    </div>
  );
}

export default KanjiInfo;
