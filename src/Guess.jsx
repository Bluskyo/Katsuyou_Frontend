import { useState } from "react";

function Guess(props){
    
    const guess = props.guess;
    const setGuess = props.setGuess;

    const setTriggerGuess = props.setTriggerGuess;

    const conjugationData = props.conjugationData;

    const [showFlag, setShowFlag] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        checkAnswer(guess, conjugationData.conjugation); // Validate the guess
    };

    function checkAnswer(input, answer, answerHiragana) {
        if (input == answer || input == answerHiragana) { 
                setShowFlag("Correct!")

                setTimeout(() => {
                    setTriggerGuess(guess);
                    setShowFlag("");
                }, 2000);
            } 
        else setShowFlag("Incorrect, try again!");
    };

    return(
        <div>
            <p>{showFlag}</p>
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