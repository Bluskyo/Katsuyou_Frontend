import Header from './Header.jsx'
import Footer from './Footer.jsx'
import KanjiInfo from './KanjiInfo.jsx';
import Settings from './Settings.jsx';
import Guess from './Guess.jsx';

function App() {
  return(
    <>
    <center>
    <Header/>
    <KanjiInfo/>
    <Guess/>
    <Settings/>
    <Footer/>
    </center>
    </>
  );
}

export default App
