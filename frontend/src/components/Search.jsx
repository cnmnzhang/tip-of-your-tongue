import data from '../mockdata.json';
import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass
} from "./styles";

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

  const handleChange = e => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };

  const expand = () => {
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");
  };

  const input = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", expand);
  }

  // // Execute a function when the user presses a key on the keyboard
  // searchBtn.addEventListener("keypress", function (event) {
  //   // If the user presses the "Enter" key on the keyboard
  //   if (event.key === "Enter") {
  //     // Cancel the default action, if needed
  //     event.preventDefault();
  //     console.log("enter")
  //     // // Trigger the button element with a click
  //     // document.getElementById("myBtn").click();
  //   }
  // });


  return (
    <div>
      <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showSearchInput}
    >
      <SearchInput ref={targetRef} showSearchInput={showSearchInput} onChange={handleChange}/>
      {console.log(query)}
      {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
    </Container>

      {/* <form id="content">
        <input type="text" name="input" className="input" id="search-input"  />
      </form> */}
      {searchShow &&
        data.filter(entry => {
          if (query === '') {
            return entry;
          } else if (entry.word.toLowerCase().includes(query.toLowerCase())) {
            return entry;
          } else {
            return null;
          }
        }).map((entry, index) => (
          <div className="box" key={index}>
            <p>{entry.word}</p>
          </div>
        ))
      }

    </div>
  );
}

export default Search;