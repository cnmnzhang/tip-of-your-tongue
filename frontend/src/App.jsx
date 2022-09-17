import cat from './cat.svg';
import Search from './components/Search';

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
        <input></input>
      </header>


      <div className="App-body">
        <Search />


      </div>
    </div>
  );
}

export default App;