import React from "react";
import FiltersButtonGroup from "./_filtersButtonGroup";
import FiltersTabs from "./_filtersTab";
import FiltersTabsContent from "./_filtersTabsContent";

const Filters = (props) => {
  return (
    <>
      <div className="search-section row">
        <div className="intro col-12">
          <h1 className="main-title">iDispenser</h1>
          <p>
            Selecciona uno o más parámetros para realizar la búsqueda y haz
            click en el botón de consulta:
          </p>
        </div>
        <div className="col-xxl-2 col-lg-4 mb-3">
          <FiltersTabs />
        </div>
        <div className="col-xxl-8 col-lg-8 mb-5">
          <FiltersTabsContent />
        </div>
        <div className="col-xxl-2 col-lg-12 mb-3">
          {/* <FiltersButtonGroup /> */}
        </div>
      </div>
    </>
  );
};

export default Filters;
