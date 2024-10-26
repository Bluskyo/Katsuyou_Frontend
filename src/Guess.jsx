import { useState } from "react";

function Guess(props){
    
    const guess = props.guess;
    const setGuess = props.setGuess;
    const setTriggerGuess = props.setTriggerGuess;
    const conjugationData = props.conjugationData;
    const triesToggle = props.triesToggle;
    const streakToggle = props.streakToggle;

    const [showFlag, setShowFlag] = useState("");
    const [tries, setTries] = useState(0);
    const [streak, setStreak] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        checkAnswer(guess, conjugationData.conjugation); // Validate the guess
    };

    function checkAnswer(input, answer, answerHiragana) {
        if (input == answer || input == answerHiragana) { 
                setShowFlag("Correct!")
                setTries(tries + 1 );

                setTimeout(() => {
                    setTriggerGuess(guess);
                    setShowFlag("");
                    setTries(0);
                    setStreak(streak + 1);
                }, 2000);
            } 
        else {
            setShowFlag("Incorrect, try again!")
            setTries(tries + 1 );
            setStreak(0);
        }
    };

    function displayTries(){
        if (triesToggle) {
            return <p>Tries: {tries}</p>
        } else return "";
    }

    function displayStreak() {
        if (streakToggle) {
            return <p>Streak🔥: {streak}</p>
        } else return "";
    }

    return(
        <div>
            <p>{showFlag}</p>
            {displayTries()} {displayStreak()}
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                    name="userGuess" 
                    placeholder="Type your guess" 
                    onChange={(e) => setGuess(e.target.value)}
                    />
                </label>
            </form>
        </div>
    );
}

export default Guess;