import React, { useState } from "react";

import { getHighlightedFormat } from "../../functions/functions";
import AutocompleteComponent from "./_autocompleteComponent";

function SearchSectionAutocomplete(props) {
  // PROPS
  const options = props.options || [];
  const placeholder = props.placeholder || "";
  const cellsToDisplay = props.cellsToDisplay || Object.keys(props.options[0]);
  const [searchText, setSearchText] = useState("");

  // note: the id field is mandatory
  const handleOnSearch = (string) => {
    props.handleChange(string);
    setSearchText(string);
  };

  const handleOnSelect = (item) => {
    setSearchText(item.id);
    props.handleChange(item.id);
  };

  // HIGHLIGHT PRESSED LETTERS
  // COMBINED FIELDS
  props.options.map((item) => {
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
    props.options[0] && (
      <AutocompleteComponent
        items={props.options}
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
  );
}
export default SearchSectionAutocomplete;
