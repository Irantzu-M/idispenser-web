import React from "react";
// import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import useFilterStore from "../../stores/filtersStore";
import DefaultTable from "../tables/_defaultTable";

function FilterSensorType(props) {
  const [data, setData] = useState([]);
  // const [remapData, setRemapData] = useState([]);
  // TODO - Use api
  useEffect(() => {
    //   fetch(
    //     "http://127.0.0.1:5500/modules/idispenser/src/main/resources/META-INF/resources/lib/mocks/filters/_mockSensorType.json"
    //   )
    //     .then((response) => response.json())
    //     .then((rawdata) => setData(rawdata));
    setData([
      { id: "1", label: "pusher", selected: false },
      { id: "2", label: "ustrasound", selected: false },
      { id: "3", label: "weighing", selected: false },
      { id: "4", label: "custody", selected: false },
    ]);
  }, []);
  // setData([
  //   { id: "1", label: "pusher", selected: false },
  //   { id: "2", label: "ustrasound", selected: false },
  //   { id: "3", label: "weighing", selected: false },
  //   { id: "4", label: "custody", selected: false },
  // ]);

  // useEffect(() => {
  //   async function remap() {
  //     if (data != undefined) {
  //       setRemapData(
  //         data.map((item) => {
  //           return {
  //             id: item.id,
  //             "Código ": item.id,
  //             "Nombre ": item["Cliente"],
  //           };
  //         })
  //       );
  //     }
  //   }
  //   remap();
  // }, [data]);

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
        stripped
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
