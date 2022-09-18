
import cat from './cat.svg';
import Search from './components/Search';
import Audio from './components/Audio';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={cat} className="App-logo" alt="logo" />
        <div className="App-text">

        <p>
          Cat got your tongue?
        </p>
        <h1>
          Tell me what you're thinking
        </h1>

        </div>
      </header>

      <div className="App-body">
        <Audio />

        <Search />


      </div>
    </div>
  );
}

export default App;
