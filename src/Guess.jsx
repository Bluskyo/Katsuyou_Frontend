import { useState } from "react";
import { toHiragana } from 'wanakana';


function Guess(props){
    
    const guess = props.guess;
    const setGuess = props.setGuess;
    const setTriggerUpdate = props.setTriggerUpdate;
    const conjugationData = props.conjugationData;

    const triesToggle = props.triesToggle;
    const streakToggle = props.streakToggle;

    const [tries, setTries] = useState(0);
    const [streak, setStreak] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Validate the guess for either romaji, hiragana or kanji.
        checkAnswer(guess, conjugationData.conjugation, conjugationData.reading); 
    };

    function checkAnswer(input, answer, answerHiragana) {
        
        const userGuessElement = document.getElementById('userGuessId');

        if (input == answer || toHiragana(input) == answerHiragana) { 
                setTries(tries + 1 );
                // removes last typed guess.
                document.getElementById('userGuessId').value = ''
                 
                setTriggerUpdate(prev => prev + 1);
                setTries(0);
                setStreak(streak + 1);
            } 
        else {
            setTries(tries + 1 );
            setStreak(0);
            // adds and removes shake class to userguessID to achive shake effect.
            userGuessElement.classList.add('shake');

            setTimeout(() => {
                userGuessElement.classList.remove('shake');
            }, 500);

        }
    };

    function DisplayStats() {
        return (
            <div className="stats">
                {triesToggle && <p className="stats-no-space">Tries✍️: {tries}</p>}
                {streakToggle && <p className="stats-no-space">Streak🔥: {streak}</p>}
            </div>
        );
    }

    return(
        <div>
            <DisplayStats />
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text"
                    name="userGuess"
                    id="userGuessId" 
                    placeholder="Write in Kanji, Hiragana or Romaji" 
                    onChange={(e) => setGuess(e.target.value)}
                    autoFocus
                    />
                </label>
            </form>
        </div>
    );
}

export default Guess;