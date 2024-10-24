
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
  const shortendGloss = data.gloss.split(", ").slice(0, 3).join(", ");
  // Incase of more readings chooses first one.
  const onlyOneReading = data.reading.split(", ")[0];

  function furigana() {
    let furiganaArray = [];
    let furigana = "";

    for (let i = 0; i < onlyOneReading.length; i++) {

      if (onlyOneReading[i] != data.entry[i]) {
        furigana += onlyOneReading[i];

      } else if (onlyOneReading[i] == data.entry[i]){
        if (furigana != "") {
          furiganaArray.push(furigana);
          furigana = "";
        }

      }
    } 
    if (furigana !== "") {
      furiganaArray.push(furigana);
    }

    return furiganaArray
  }

  return (
    <div>
      <h2>
        {furigana()}<br/>
        {data.entry}<br/>
      </h2>
      <h3>{shortendGloss}</h3>  
      <h3>{conjugationData.tense} {conjugationData.formality} {conjugationData.assertion}</h3>
      <p>{conjugationData.conjugation}</p>
    </div>
  );
}

export default KanjiInfo;
