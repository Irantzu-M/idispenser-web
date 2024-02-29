import React from "react";
import useFilterStore from "../../stores/filtersStore";

const ResultsAppliedFilters = (props) => {
  const filters = useFilterStore((state) => state.filters);

  const restoreSingleFilter = useFilterStore(
    (state) => state.restoreSingleFilter
  );
  const removeSelectedFilter = (item) => {
    restoreSingleFilter(item);
  };
  return (
    <>
      <div className="results--applied-filters d-flex">
        {filters
          .filter((filter) => {
            if (filter.selected.length > 0) {
              return filter;
            }
          })
          .map((item) => {
            return (
              <div
                className="results--applied-filters--item"
                key={"results--applied-filters--item-" + item.name}
                onClick={() => removeSelectedFilter(item)}
              >
                {item.label.es}
                <span className="icon icon-x"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ResultsAppliedFilters;
