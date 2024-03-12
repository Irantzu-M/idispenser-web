import React, { useState, useEffect, useRef } from "react";

const AutocompleteComponent = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const options = props.items || [];
  const resultStringKeyName = props.resultStringKeyName || "id";
  const autocompleteRef = useRef(null);

  const onSearch = props.onSearch;
  const onSelect = props.onSelect;

  useEffect(() => {
    setFilteredOptions(
      props.items.filter((option) =>
        option[resultStringKeyName]
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, props.items]);

  const highlightMatch = (text, match) => {
    const startIndex = text.toLowerCase().indexOf(match.toLowerCase());
    if (startIndex !== -1) {
      const beforeMatch = text.slice(0, startIndex);
      const matchedText = text.slice(startIndex, startIndex + match.length);
      const afterMatch = text.slice(startIndex + match.length);
      return (
        <>
          {beforeMatch}
          <strong>{matchedText}</strong>
          {afterMatch}
        </>
      );
    } else {
      return text;
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setShowOptions(value.length >= 6 && filteredOptions.length > 0);
    if (value.length >= 6) {
      props.onSearch(value);
    }
  };

  const handleSelect = (item) => {
    setInputValue(item[resultStringKeyName]);
    onSelect(item);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="search-section--autocomplete" ref={autocompleteRef}>
        <div className="wrapper">
          <div className="">
            <input
              type="text"
              id="autocomplete"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search by code or name"
            />
            <span className="icon icon-search"></span>
          </div>
        </div>
      </div>
      <div className="search-section--autocomplete--dropdown">
        <div className="wrapper">
          {showOptions && inputValue.length >= 6 && (
            <ul>
              {filteredOptions.map((option, index) => (
                <li key={index} onClick={() => handleSelect(option)}>
                  {highlightMatch(option[resultStringKeyName], inputValue)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AutocompleteComponent;
