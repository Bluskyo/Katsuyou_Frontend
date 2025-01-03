export function getFurigana(kanji, reading) {
  // Handle incomplete data or hiragna word.
  if (!kanji || !reading) return []; 
  if (kanji == reading) return (
    <span>
      <ruby>{kanji}</ruby>
    </span>
  )
  
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
      if (i == reading.length -1){
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

  // tests: 足りる, 頑張る, 振り返る, 買う, 歌う
  
    return (
      <span>
        {kanjiArray.map((kanji, index) => (
          <ruby key={index}>
            {kanjiArray[index]}
            <rt>{furiganaArray[index]}</rt>
            {hiraganaArray[index]}
          </ruby>
        ))}
      </span>
    );

}

export default getFurigana;