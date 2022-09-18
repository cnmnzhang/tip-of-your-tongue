import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass
} from "./styles";

import Response from "./Response";

import axios from "axios";

function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);

  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])

  // useEffect(() => {
  //   setResult(["Can you briefly attempt to define the word?", "Enter '?' if you are unsure."])
  //   console.log(result)
  // }, []);


  const handleChange = e => {
    setQuery(e.target.value);
  };

  // new line start

  function getData() {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/${query}`,
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

  function response() {
    return (
    <div>
        <Response message={result.message} next={result.next} />
      </div>
    )
  }


  return (
    <div>
<p>
        ... type 'reset' if prompt is being confusing ...
      </p>

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
              console.log(query)
              getData();
            }
          }}
        />
        {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
      </Container>

      {response()}



    </div>
  );
}

export default Search;
