export function getFurigana(kanji, reading) {
  if (!kanji || !reading) return []; // Incase of incomplete data.
  
    let furiganaArray = [];
    let kanjiArray = []

    let furigana = "";

    let currentKanji = 0;

    // 振り返る
    //　ふりかえる
    for (let i = 0; i < reading.length; i++) {
      if (reading[i] != kanji[currentKanji]) {
        furigana += reading[i];  
        
        // checks if reading is same as next char, then goes to next char in kanji word.
        if (reading[i + 1] == kanji[currentKanji + 1]){
          furiganaArray.push(furigana);
          kanjiArray.push(kanji[currentKanji]);

          currentKanji += 1
          furigana = "";
        }
          // pushes remaining readings.
      } else if (reading[i] == kanji[i] && furigana !== ""){

        currentKanji += 1
        
        furiganaArray.push(furigana);
        kanjiArray.push(kanji[currentKanji]);

        furigana = "";
      } else {console.log(reading[i])}
    } 

    // removes trailing ending.
    if (furigana !== "") {
      if (furigana.slice(-1) == reading.slice(-1)){
        furiganaArray.push(furigana.slice(0, - 1));
        kanjiArray.push(kanji[currentKanji + 1]);
      } else {
        furiganaArray.push(furigana);
        kanjiArray.push(kanji[currentKanji]);
      }
    }

    console.log(kanji)
    console.log(kanjiArray)
    console.log(furiganaArray)

    return (
      <div>
        {kanjiArray.map((kanji, index) => (
          <ruby key={index}>
            {kanji}
            <rt>{furiganaArray[index]}</rt>
          </ruby>
        ))}
      </div>
    );
      
      

    



}

export default getFurigana;