import React from "react";
import ClayButton from "@clayui/button";
import { useFilterButtonsStore } from "../../stores/filtersStore";

const FiltersButton = (props) => {
  const setItemTypeToFind = useFilterButtonsStore(
    (state) => state.setItemTypeToFind
  );

  const handleFindClick = (itemType) => {
    setItemTypeToFind(itemType);
  };

  return (
    <>
      <div
        key={"search-section-btn-" + props.item.name.toLowerCase().normalize()}
        className={"col-xxl-12 col"}
      >
        <ClayButton
          displayType="secondary"
          onClick={() => handleFindClick(props.item.name)}
          className={props.itemClass}
        >
          {props.item.label}
        </ClayButton>
      </div>
    </>
  );
};

export default FiltersButton;
