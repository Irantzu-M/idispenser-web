import React, { useState } from "react";
import useFilterStore from "../../stores/filtersStore";

import DefaultTable from "../tables/_defaultTable";

function FilterProductStores(props) {
  const [tabs, setTabs] = useState(useFilterStore((state) => state.filters));
  const selectedTab = tabs.filter((tab) => {
    if (tab.id === props.filter.id) {
      return tab;
    }
  });
  const selectedItems = selectedTab[0].selected;
  const removeFilterItem = useFilterStore((state) => state.removeFilterItem);
  const handleRemove = (itemToRemove) => {
    removeFilterItem(itemToRemove, selectedTab[0]);
  };

  //SELECTABLE para usar tablas default
  const addFilterItem = useFilterStore((state) => state.addFilterItem);
  const handleAdd = (itemToAdd) => {
    addFilterItem(itemToAdd, selectedTab[0]);
  };
  const handleSelect = (checkSelected, item) => {
    if (!checkSelected) {
      handleAdd(item);
    } else {
      handleRemove(item);
    }
  };
  // ROW
  return (
    <>
      {selectedItems.length > 0 && (
        <DefaultTable
          stripped
          multiselect
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          data={selectedItems}
          customHeader="Artículos seleccionados"
        ></DefaultTable>
      )}
      <DefaultTable
        stripped
        multiselect
        handleSelect={handleSelect}
        selectedItems={selectedItems}
        tableQuery={"filters/_mockProductstores" + ".json"}
        className="bg-lighter"
      ></DefaultTable>
    </>
  );
}

export default FilterProductStores;
