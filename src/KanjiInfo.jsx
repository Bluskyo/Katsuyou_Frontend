
function KanjiInfo(props) {
const data = props.kanjiData;
const conjugationData = props.conjugationData;

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
  const shortendMeanings = data.gloss.split(", ").slice(0, 3).join(", ");

  // if (conjugationData.tense)

  return (
    <div>
      <h2>
        {data.reading}<br/>
        {data.entry}<br/>
      </h2>
      <h3>{shortendMeanings}</h3>  
      <h3>{conjugationData.tense} {conjugationData.formality} {conjugationData.assertion}</h3>
      <p>{conjugationData.conjugation}</p>
    </div>
  );
}

export default KanjiInfo;
