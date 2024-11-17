import  getFurigana  from './methods/getFurigana.jsx';

function KanjiInfo(props) {
const data = props.kanjiData;
const conjugationData = props.conjugationData;

const furiganaToggle = props.furiganaToggle;

  if (!data || !conjugationData) {
    return (
      <div>
        <h2>
          Loading...<br/>
          Loading...<br/>
        </h2>
        <h3>Loading...</h3>  
        <h3>Loading...</h3>
      </div>
    );
  }

  // Limit gloss/meaning to only have 3 meanings.
  const shortendGloss = data.gloss.split(", ").slice(0, 3).join(", ");
  // Incase of more readings chooses first one.
  const reading = data.reading.split(", ")[0];

  let wordWithFurigana = getFurigana(data.entry, reading)

  return (
    <div>
      <h2>{wordWithFurigana}</h2>
      <h3>{shortendGloss}</h3>  
      <h3>{conjugationData.tense} {conjugationData.formality} {conjugationData.assertion}</h3>
      <p>{conjugationData.conjugation}</p>
      <p>{conjugationData.reading}</p>
    </div>
  );
}

export default KanjiInfo;
