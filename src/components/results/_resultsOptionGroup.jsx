import React from "react";
import { useEffect, useState } from "react";
import { useFilterButtonsStore } from "../../stores/filtersStore";
import ResultsActionbarButtons from "./_resultsActionbarButtons";
import ResultsOption from "./_resultsOption";

const ResultsOptionGroup = () => {
  const [buttons, setButtons] = useState(
    useFilterButtonsStore((state) => state.buttons)
  );
  const [showOptionsWrapper, setShowOptionsWrapper] = useState(false);
  const toggleOptionsWrapper = () => {
    setShowOptionsWrapper(!showOptionsWrapper);
  };

  const itemTypeToFind = useFilterButtonsStore((state) => state.itemTypeToFind);

  return (
    <div className="col results--options">
      <div className="results--options-toggler" onClick={toggleOptionsWrapper}>
        {"Consulta de "}
        {buttons
          .filter((btn) => btn.name === itemTypeToFind)
          .map((b) => (
            <span key={"result-option-selected-" + b.name}>
              {b.label.es}
              <span className="icon icon-chevron-down"></span>
            </span>
          ))}
      </div>
      {showOptionsWrapper && (
        <div id="results--options-wrapper" onClick={toggleOptionsWrapper}>
          {buttons.map((item) => {
            return (
              <ResultsOption
                item={item}
                key={"results-option--" + item.name}
                itemClass={item.name === itemTypeToFind ? "active" : ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ResultsOptionGroup;
