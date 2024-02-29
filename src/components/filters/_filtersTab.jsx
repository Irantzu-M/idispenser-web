import React, { useLayoutEffect, useState } from "react";
// import ClayTabs from "@clayui/tabs";
import useFilterStore, {
  useFilterButtonsStore,
} from "../../stores/filtersStore";

function FilterTab(props) {
  const tab = props.tab;
  const filterStoreFilters = useFilterStore((state) => state.filters);
  const [active, setActive] = useState(useFilterStore((state) => state.active));
  const setActiveStore = useFilterStore((state) => state.setActive);

  const handleClick = (index) => {
    setActive(index);
    setActiveStore(index);
  };

  const restoreFilters = useFilterStore((state) => state.restoreFilters);
  const setItemTypeToFind = useFilterButtonsStore(
    (state) => state.setItemTypeToFind
  );
  const handleRestore = () => {
    restoreFilters();
    setItemTypeToFind("");
  };

  useLayoutEffect(() => {
    if (!active || active == 0) {
      setActive(1);
    }
  }, []);

  return (
    <>
      {/* <div className="search-section--tabs mb-3">
        <ClayTabs active={active} onActiveChange={setActive}>
          {filterStoreFilters.map((tab, index) => (
            <ClayTabs.Item
              key={"uique" + index}
              innerProps={{
                "aria-controls": "tabpanel-" + index,
              }}
              className={"search-section--item"}
              id={"search-section--pills-" + index + "-tab"}
              onClick={() => handleClick(index)}
            >
              <span className="search-section--name">{tab.label.es}</span>
              {tab.selected.length > 0 && (
                <span className="search-section--count">
                  {tab.selected.length}
                </span>
              )}
              {tab.name == "hub" || tab.name == "sensor" ? (
                <span className="search-section--icon icon icon-search"></span>
              ) : (
                <span className="search-section--icon icon icon-chevron-right"></span>
              )}
            </ClayTabs.Item>
          ))}
        </ClayTabs>
        <a
          href="#"
          className="search-section--reset"
          onClick={() => handleRestore()}
        >
          <span className="icon icon-refresh"></span>
          <span className="name">Reestablecer filtros</span>
        </a>
      </div> */}

      <div className="search-section--tabs mb-3">
        <ul className="nav nav-tabs" role="tablist">
          {filterStoreFilters.map((tab, index) => (
            <li
              key={"search-section-item-" + index}
              // aria-controls={"tabpanel-" + index}
              className={"search-section--item"}
              id={"search-section--pills-" + index + "-tab"}
              onClick={() => handleClick(tab.id)}
            >
              <button
                className={
                  "nav-link btn btn-unstyled " +
                  (active == tab.id ? " selected" : "")
                }
                type="button"
                // aria-controls={"tabpanel-" + index}
                // aria-selected={active == tab.id ? true : false}
                role="tab"
                // tabindex="-1"
              >
                <span className="search-section--name">{tab.label.es}</span>
                {tab.selected.length > 0 && (
                  <span className="search-section--count">
                    {tab.selected.length}
                  </span>
                )}
                {tab.name == "hub" || tab.name == "sensor" ? (
                  <span className="search-section--icon icon icon-search"></span>
                ) : (
                  <span className="search-section--icon icon icon-chevron-right"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="search-section--reset"
          onClick={() => handleRestore()}
        >
          <span className="icon icon-refresh"></span>
          <span className="name">Reestablecer filtros</span>
        </a>
      </div>
    </>
  );
}

export default FilterTab;
