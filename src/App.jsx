import Header from './Header.jsx'
import Footer from './Footer.jsx'
import KanjiProvider from './KanjiProvider.jsx';

function App() {
    return(
    <>
      <center>
        <Header/>
        <KanjiProvider/>
        <Footer/>
      </center>
    </>
  );
}

export default App
