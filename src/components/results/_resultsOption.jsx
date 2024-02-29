import React from "react";
import ClayButton from "@clayui/button";
import { useFilterButtonsStore } from "../../stores/filtersStore";

const ResultsOption = (props) => {
  const setItemTypeToFind = useFilterButtonsStore(
    (state) => state.setItemTypeToFind
  );
  const itemTypeToFind = useFilterButtonsStore((state) => state.itemTypeToFind);

  const handleFindClick = (itemType) => {
    setItemTypeToFind(itemType);
  };

  return (
    <>
      <div
        key={"search-section-btn-" + props.item.name.toLowerCase().normalize()}
        className={
          "results--options-item" +
          (itemTypeToFind == props.item.name ? " active" : "")
        }
        onClick={() => handleFindClick(props.item.name)}
      >
        <span className={"txt col " + props.itemClass}>
          {"Consulta de "}
          {props.item.label.es}
        </span>
        <span className="icon icon-check"></span>
      </div>
    </>
  );
};

export default ResultsOption;
