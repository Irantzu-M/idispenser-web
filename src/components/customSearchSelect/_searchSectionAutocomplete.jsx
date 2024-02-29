import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Autocomplete from "./_autocomplete";
import { getHighlightedFormat } from "../../functions/functions";
import AutocompleteComponent from "./_autocompleteComponent";

function SearchSectionAutocomplete(props) {
  // PROPS
  const options = props.options || [];
  const placeholder = props.placeholder || "";
  const cellsToSearchIn = props.cellsToSearchIn || Object.keys(options[0]);
  const cellsToDisplay = props.cellsToDisplay || Object.keys(options[0]);
  const handleChange = props.handleChange;
  const [searchText, setSearchText] = useState("");

  // note: the id field is mandatory
  const handleOnSearch = (string) => {
    handleChange(string);
    setSearchText(string);
  };

  const handleOnSelect = (item) => {
    setSearchText(item.combinedField);
    props.handleChange(item.combinedField);
  };

  // HIGHLIGHT PRESSED LETTERS

  // COMBINED FIELDS
  options.map((item) => {
    if (!item.combinedField) {
      const combinedField = cellsToDisplay
        .map((field) => {
          return item[field];
        })
        .toString()
        .replaceAll(",", " ");
      item.combinedField = combinedField;
      return item;
    }
  });

  const autocompleteFormat = (item) => {
    const userInput = searchText;

    return (
      <>
        {userInput?.length
          ? item.combinedField?.split(" ").length
            ? getHighlightedFormat(item.combinedField, userInput)
            : item.combinedField
          : item.combinedField}
      </>
    );
  };

  return (
    options[0] && (
      <AutocompleteComponent
        items={options}
        fuseOptions={{ minMatchCharLength: 6, keys: cellsToSearchIn }}
        showNoResults={false}
        resultStringKeyName="combinedField"
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        formatResult={autocompleteFormat}
        className={
          props.formControl
            ? "search-section--autocomplete form-control"
            : "search-section--autocomplete"
        }
        placeholder={placeholder}
      />
    )

    // options[0] && (
    //   <ReactSearchAutocomplete
    //     items={options}
    //     fuseOptions={{ minMatchCharLength: 6, keys: cellsToSearchIn }}
    //     showNoResults={false}
    //     resultStringKeyName="combinedField"
    //     onSearch={handleOnSearch}
    //     onSelect={handleOnSelect}
    //     formatResult={autocompleteFormat}
    //     className={
    //       props.formControl
    //         ? "search-section--autocomplete form-control"
    //         : "search-section--autocomplete"
    //     }
    //     placeholder={placeholder}
    //   />
    // )
  );
}
export default SearchSectionAutocomplete;
