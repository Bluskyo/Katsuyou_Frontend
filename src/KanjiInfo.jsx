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

  function furigana() {
    if (furiganaToggle)
      {
        let furiganaArray = [];
        let furigana = "";

        let currentKanji = 0;
    
        for (let i = 0; i < reading.length; i++) {

          if (reading[i] != data.entry[currentKanji]) {
            furigana += reading[i];  
            
            // checks if reading is same as next char, then goes to next char in kanji word.
            if (reading[i + 1] == data.entry[currentKanji + 1]){
              currentKanji += 1
              furiganaArray.push(furigana);
              furigana = "";
            }
              // pushes remaining readings.
          } else if (reading[i] == data.entry[i] && furigana !== ""){
            currentKanji += 1
            furiganaArray.push(furigana);
            furigana = "";
          }
        } 
    
        // removes trailing ending.
        if (furigana !== "") {
          if (furigana.slice(-1) == reading.slice(-1)){
            furiganaArray.push(furigana.slice(0, -1));
          } else {
            furiganaArray.push(furigana);
          }
        }
    
        return furiganaArray

      } else return "";
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
      <p>{conjugationData.reading}</p>
    </div>
  );
}

export default KanjiInfo;
