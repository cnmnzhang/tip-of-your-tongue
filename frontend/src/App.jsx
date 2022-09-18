import React, { useState} from 'react';
import cat from './cat.svg';
import Search from './components/Search';
import axios from "axios";


function App() {

  // new line start
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })};
    //end of new line 

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

        {/* new line start*/}
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
         {/* end of new line */}


      </div>
    </div>
  );
}

export default App;
