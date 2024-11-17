export function getFurigana(kanji, reading) {
  if (!kanji || !reading) return []; // Handle incomplete data
  
  let furiganaArray = [];
  let kanjiArray = [];
  let hiraganaArray = [];

  let furigana = "";
  let hiragana = "";
  let currentWord = ""; // Tracks consecutive kanji

  for (let i = 0; i < reading.length; i++) {
    const charKanji = kanji[i];
    const charReading = reading[i];

    // checks if char is kanji.
    const isKanji = charKanji && charKanji.match(/[\u4E00-\u9FBF]/);

    if (isKanji) {
      // adds together word
      currentWord += charKanji;
    } else {
      // if char is not kanji pushes it to kanjiArray.
      if (currentWord) {
        kanjiArray.push(currentWord);
        currentWord = ""; // reset kanji word when chain of kanjibroken.
      }
    }

    // finds furigana
    if (charKanji !== charReading) {
      // if on last reading, exclude hiragana from furigana.
      if (reading[i] === reading[reading.length -1]){
          furiganaArray.push(furigana)
      } else {
          furigana += charReading;
          
          if (hiragana) {
              // pushes if hiragana is not empty. 
              hiraganaArray.push(hiragana);
              hiragana = ""; // Reset hiragana tracker
          }
      }
    } else if (furigana) {
      // if char is not hiragana push it to furiganaArray
      furiganaArray.push(furigana);
      furigana = ""; // reset 
    }
    // finds hiragana, ensures that hiragana is not the ending.
    if (!isKanji && charReading !== furigana[furigana.length -1]) {
      hiragana += charReading;
    } else if (hiragana ) {
      // pushes if hiragana is not empty. 
      hiraganaArray.push(hiragana);
      hiragana = ""; // Reset hiragana tracker
    }
  }

  // push remaining kanji/hiragana
  if (currentWord) kanjiArray.push(currentWord);
  if (hiragana) hiraganaArray.push(hiragana); 

  // tests:  足りる, 頑張る, 振り返る, 買う
  
    return (
      <div>
        {kanjiArray.map((kanji, index) => (
          <ruby key={index}>
            {kanjiArray[index]}
            <rt>{furiganaArray[index]}</rt>
            {hiraganaArray[index]}
          </ruby>
        ))}
      </div>
    );

}

export default getFurigana;