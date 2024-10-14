
function Guess(props){
    
    const guess = props.guess;
    const setGuess = props.setGuess;
    const setTriggerGuess = props.setTriggerGuess;
    const conjugationData = props.conjugationData;

    // test
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        checkAnswer(guess, conjugationData.conjugation); // Validate the guess
    };

    function checkAnswer(input, answer){
        if (input == answer){
        console.log("Correct! Next kanji!");
        setTriggerGuess(guess);
        } else{
        console.log('Incorrect, try again!')}
    };

    console.log(guess);

    return(
        <div>
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