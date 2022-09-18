
import cat from './cat.svg';
import Search from './components/Search';
import Audio from './components/Audio';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={cat} className="App-logo" alt="logo" />
        <p>
          Cat got your ...
        </p>
        <h1>
          Let's figure this out
        </h1>
        <Audio />

        <Search />
      </header>

      <div className="App-body">


      </div>
    </div>
  );
}

export default App;
