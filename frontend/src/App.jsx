
import cat from './cat.svg';
import Search from './components/Search';
import Audio from './components/Audio';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {

  const [catUrl, setCatUrl] = useState("")

  useEffect(() => {
    const intervalID = setTimeout(() =>  {
      getCat();
    }, 3000);

    return () => clearInterval(intervalID);
}, []);


  function getCat() {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/cats/`,
    })
      .then((response) => {
        const res = response.data
        setCatUrl(res)
        console.log(cat)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={cat} className="App-logo" alt="logo" />
        <div className="App-text">

        <h2>
          Cat got your tongue?
        </h2>
        <h1>
          We'll help you find it
        </h1>

        </div>
      </header>

      <div className="App-body">

        <Search />

      <Audio />

      <img className="App-cat" src={catUrl}/>

      </div>
    </div>
  );
}

export default App;
