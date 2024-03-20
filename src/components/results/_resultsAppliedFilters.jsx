import React from "react";
import useFilterStore from "../../stores/filtersStore";
import useResultsStore from "../../stores/resultsStore";

const ResultsAppliedFilters = (props) => {
  const filters = useFilterStore((state) => state.filters);
  const setUpdateResults = useResultsStore((state) => state.setUpdateResults);

  const restoreSingleFilter = useFilterStore(
    (state) => state.restoreSingleFilter
  );
  const removeSelectedFilter = (item) => {
    restoreSingleFilter(item);
  };

  const handleClick = (item) => {
    removeSelectedFilter(item);
    setUpdateResults(true);
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
                onClick={() => handleClick(item)}
              >
                {item.label}
                <span className="icon icon-x"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ResultsAppliedFilters;
