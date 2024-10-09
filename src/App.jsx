import Header from './Header.jsx'
import Footer from './Footer.jsx'
import KanjiInfo from './KanjiInfo.jsx';
import Settings from './Settings.jsx';
import Guess from './Guess.jsx';

import KanjiProvider from './KanjiProvider.jsx';

function App() {
  return(
    <>
    <center>
    <Header/>
    <KanjiProvider>
    <KanjiInfo/>
    <Guess/>
    <Settings/>
    </KanjiProvider>
    <Footer/>
    </center>
    </>
  );
}

export default App
