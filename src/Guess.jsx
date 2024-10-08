import { useState } from 'react';

function Guess(){
    const [guess, setGuess] = useState("")
    return(
        <div>
            <p>{guess}</p>
            <label>
            <input placeholder="Type your guess" onChange={e => setGuess(e.target.value)}/>
            </label>
        </div>
    );
}

export default Guess