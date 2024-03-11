import React from "react";
import { useEffect, useState } from "react";
import useFilterStore from "../../stores/filtersStore";
import DefaultTable from "../tables/_defaultTable";

function FilterSensorType(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      { id: "1", label: "pusher", selected: false },
      { id: "2", label: "ustrasound", selected: false },
      { id: "3", label: "weighing", selected: false },
      { id: "4", label: "custody", selected: false },
    ]);
  }, []);

  // const [anySensorSelected, setAnySensorSelected] = useState("");
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

  // //SELECTABLE para usar tablas default
  const filters = useFilterStore((state) => state.filters);
  const addFilterItem = useFilterStore((state) => state.addFilterItem);
  const restoreSingleFilter = useFilterStore(
    (state) => state.restoreSingleFilter
  );
  const handleAdd = (itemToAdd) => {
    restoreSingleFilter(selectedTab[0]);
    addFilterItem(itemToAdd, selectedTab[0]);
  };
  const handleSelect = (checkSelected, item) => {
    if (!checkSelected) {
      handleAdd(item);
    } else {
      handleRemove(item);
    }
  };

  return (
    <>
      <p>Selecciona la tipología del sensor:</p>

      <DefaultTable
        striped
        select
        handleSelect={handleSelect}
        selectedItems={selectedItems}
        data={data}
        customHeader="none"
        // itemType={"sensortype"}
        className="table--sm"
      />
    </>
  );
}

export default FilterSensorType;
