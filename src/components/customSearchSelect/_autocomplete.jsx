import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Autocomplete(props) {
  const items = props.items || [];
  const resultStringKeyName = props.resultStringKeyName || "id";
  const onSearch = props.onSearch;
  const onSelect = props.onSelect;

  return (
    <>
      // TODO autocomplete a partir de 6 caracteres lanzar búsqueda
      <div className="search-section--autocomplete">
        <div className="wrapper">
          <div className="">
            <span className="icon icon-search"></span>
            <input
              type="text"
              //spellCheck="false"
              placeholder="Search by code or name"
              //data-test="search-input"
              //defaultValue=""
            />
          </div>
        </div>
      </div>
      <div className="items">
        {items.map((item) => {
          return (
            <div className="items-item" key={"autocomplete-" + item.id}>
              {item[resultStringKeyName]}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Autocomplete;
