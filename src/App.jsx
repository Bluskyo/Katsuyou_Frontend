import Header from './Header.jsx'
import Footer from './Footer.jsx'
import KanjiInfo from './KanjiInfo.jsx';
import Center from './Center.jsx'

import { useState } from 'react';


function App() {
  const [guess, setGuess] = useState("")
  
  return(
    <>
    <center>
    <Header/>
    <KanjiInfo/>
    <p>{guess}</p>
    <label>
      <input 
      placeholder="Type your guess"
      onChange={e => setGuess(e.target.value)} 
      />
    </label>
    <Footer/>
    </center>

    </>
  );
}

export default App
