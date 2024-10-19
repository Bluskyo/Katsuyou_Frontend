
function KanjiInfo(props) {
const data = props.kanjiData;
const conjugationData = props.conjugationData;

  if (!data || !conjugationData) return <div>Loading...</div>;

  // console.log("Data in kanjiInfo: ", conjugationData)

  return (
    <div>
      <h2>
        {data.hiragana}<br />
        {data.kanji}<br />
      </h2>
      <h3>{data.meaning}</h3>  
      <h3>{conjugationData.tense} {conjugationData.formality} {conjugationData.assertion}</h3>
    </div>
  );
}

export default KanjiInfo;
