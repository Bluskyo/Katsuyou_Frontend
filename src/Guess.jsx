
function Guess(props){
    return(
        <div>
            <p>{props.guessInput}</p>
            <label>
            <input placeholder="Type your guess" onChange={e => props.setGuess(e.target.value)}/>
            </label>
        </div>
    );
}

export default Guess