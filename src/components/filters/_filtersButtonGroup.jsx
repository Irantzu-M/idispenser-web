import React from "react";
import { useFilterButtonsStore } from "../../stores/filtersStore";
import FiltersButton from "./_filtersButton";

const FiltersButtonGroup = () => {
  const buttons = useFilterButtonsStore((state) => state.buttons);
  const itemTypeToFind = useFilterButtonsStore((state) => state.itemTypeToFind);

  return (
    <>
      <div className="search-section--buttons row">
        {buttons.map((item) => {
          return (
            <FiltersButton
              item={item}
              key={"filter-button--" + item.name}
              itemClass={item.name === itemTypeToFind && "active"}
            />
          );
        })}
      </div>
    </>
  );
};

export default FiltersButtonGroup;
