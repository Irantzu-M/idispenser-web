import React from "react";
import ClayButton from "@clayui/button";
import useFilterStore, {
  useFilterButtonsStore,
} from "../../stores/filtersStore";
import useResultsStore from "../../stores/resultsStore";

const FiltersButton = (props) => {
  const setItemTypeToFind = useFilterButtonsStore(
    (state) => state.setItemTypeToFind
  );
  const setUpdateResults = useResultsStore((state) => state.setUpdateResults);

  const handleFindClick = (itemType) => {
    setItemTypeToFind(itemType);
    setUpdateResults(true);
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
