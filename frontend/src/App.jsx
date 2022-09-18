
import cat from './cat.svg';
import Search from './components/Search';
import Audio from './components/Audio';

function App() {

  // const API_KEY = process.env.CAT_API_KEY

  // useEffect(() => {
  //   fetch("https://api.thecatapi.com/v1/images/search")
  //   .then(response => response.json())
  //       // 4. Setting *dogImage* to the image url that we received from the response above
  //   .then(data => setDogImage(data.message))
  // },[])


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


      </div>
    </div>
  );
}

export default App;
