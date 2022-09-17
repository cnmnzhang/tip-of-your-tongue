import { useState } from 'react';
import cat from './cat.svg';
import './App.css';
// import Search from './components/Search';
import data from './mockdata.json'

function App() {

  const [query, setQuery] = useState("")

  function search() {
    const filteredData = data;
    return (
      <div>
        {
          filteredData.filter(entry => {
            if (query === '') {
              return entry;
            } else if (entry.word.toLowerCase().includes(query.toLowerCase())) {
              return entry;
            }
          }).map((entry) => (
            <div key={entry.id}>
              <p>{entry.word}</p>
            </div>
          ))
        }
      </div>
    )

  }
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
      </header>

      <body>

        <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)}/>
      </body>
    </div>
  );
}

export default App;
