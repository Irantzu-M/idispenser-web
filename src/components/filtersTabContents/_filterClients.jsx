import React, { useEffect, useState } from "react";
// import SelectedItemsTable from "../filtersSelectableTables/_selectedItemsTable";
import useFilterStore from "../../stores/filtersStore";
// import useFilterStore from "http://127.0.0.1:5500/src/stores/filtersStore";
// import FilterTable from "../filtersTabContents/_filterTable";
import DefaultTable from "../tables/_defaultTable";

function FilterClients(props) {
  // const [data, setData] = useState([]);
  // const [remapData, setRemapData] = useState([]);
  // TODO - Use api
  // useEffect(() => {
  //   fetch("http://127.0.0.1:5500/src/mocks/filters/_mockClients.json")
  //     .then((response) => response.json())
  //     .then((rawdata) => setData(rawdata));
  // }, []);

  // useEffect(() => {
  //   async function remap() {
  //     setRemapData(
  //       data.map((item) => {
  //         return {
  //           id: item.id,
  //           "Código ": item.id,
  //           "Nombre ": item["Cliente"],
  //         };
  //       })
  //     );
  //   }
  //   remap();
  // }, [data]);

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
  // const updateChecked =
  //   useFilterStore((state) =>
  //     state.filters[state.filters.indexOf(props.filter)].selected.indexOf(
  //       props.item
  //     )
  //   ) > -1;

  // useEffect(() => {
  //   console.log("selectedItems");
  // }, [selectedItems]);

  return (
    <>
      {/* {selectedItems.length > 0 && (
        <SelectedItemsTable
          tabs={tabs}
          filter={props.filter}
          selectedItems={selectedItems}
          removeAction={handleRemove}
        ></SelectedItemsTable>
      )} */}
      {/* {remapData[0] && (
        <FilterTable
          getData={remapData}
          tabs={tabs}
          filter={props.filter}
        ></FilterTable>
      )} */}

      {selectedItems.length > 0 && (
        <DefaultTable
          striped
          multiselect
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          data={selectedItems}
          customHeader="Artículos seleccionados"
          // itemType={"client"}
        ></DefaultTable>
      )}
      <DefaultTable
        striped
        multiselect
        handleSelect={handleSelect}
        selectedItems={selectedItems}
        tableQuery={
          "filters/_mockClients" + /*capitalize(itemTypeToFind) +*/ ".json"
        }
        // itemType={"clients"}
        className="bg-lighter"
      ></DefaultTable>
    </>
  );
}

export default FilterClients;
