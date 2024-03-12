import React from "react";
import FilterClients from "../filtersTabContents/_filterClients";
import FilterProductStores from "../filtersTabContents/_filterProductStores";
import FilterProducts from "../filtersTabContents/_filterProducts";
import FilterHubs from "../filtersTabContents/_filterHub";
import FilterSensor from "../filtersTabContents/_filterSensor";
import FilterSensorType from "../filtersTabContents/_filterSensorType";
import useFilterStore from "../../stores/filtersStore";
// import ClayTabs from "@clayui/tabs";

function FiltersTabsContent(props) {
  const filterStoreFilters = useFilterStore((state) => state.filters);
  const active = useFilterStore((state) => state.active);

  return (
    <>
      <div className="search-section--main">
        <div
          id="search-section--pills-tabContent"
          className="tab-content"
          key={"search-section--pills-tabContent-restore--" + props.isRestored}
        >
          {filterStoreFilters.map((item) => (
            <div
              key={"search-section-tab-pane-" + item.id}
              className={
                (active == 0 && item.id == 1) || active == item.id
                  ? "d-block"
                  : "d-none"
              }
            >
              <div className="search-section--tab-header">
                <h2 className="search-section--tab-header-title">
                  Search by {item.label.es}
                </h2>
              </div>
              <div className="search-section--tab-body py-4">
                {item.name === "client" && <FilterClients filter={item} />}
                {item.name === "storage" && (
                  <FilterProductStores filter={item} />
                )}
                {item.name === "product" && <FilterProducts filter={item} />}
                {item.name === "hub" && <FilterHubs filter={item} />}
                {item.name === "sensor" && <FilterSensor filter={item} />}
                {item.name === "sensortype" && (
                  <FilterSensorType filter={item} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FiltersTabsContent;
