// src/components/Search.js

import React, { useState } from 'react';
import Scroll from './Scroll';

function Search({ searchParam }) {

  const [searchField, setSearchField] = useState(searchParam);
  const [searchShow, setSearchShow] = useState(false); 

  const words = ["red", "yellow", "g"]

  const filteredwords = words.filter(
    word => {
      return (
        word
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
    if(e.target.value===""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };

  function searchList() {
    if (searchShow) {
      return (
        <Scroll>
          <div>
            {
              filteredwords.map((word) => 
              <div>
                word
                </div>
              
              )
            }
            
          </div>
        </Scroll>
      );
    }
  }

  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search your course</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search People" 
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export default Search;