import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass
} from "./styles";

import axios from "axios";

function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);

  const [searchShow, setSearchShow] = useState(false);
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")

  const handleChange = e => {
    setQuery(e.target.value);

    if (e.target.value === "") {
      setSearchShow(false);
    }
    else {
      setSearchShow(true);

    }
  };

  // new line start

  function getData() {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/hello/${query}`,
    })
      .then((response) => {

        const res = response.data
        setResult(res)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  };
  //end of new line 


  return (
    <div>
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        hover={showSearchInput}
      >
        <SearchInput ref={targetRef}
          showSearchInput={showSearchInput}
          onChange={handleChange}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              getData();
            }
          }}
        />
        {console.log(query)}
        {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
      </Container>


      {searchShow &&
        (
          <div>
            {result}
          </div>
        )

      }

    </div>
  );
}

export default Search;
