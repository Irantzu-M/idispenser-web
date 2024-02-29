import React from "react";
import { useEffect, useState } from "react";
// import SelectedItemsTable from "../filtersSelectableTables/_selectedItemsTable";
import useFilterStore from "../../stores/filtersStore";
// import FilterTable from "../filtersTabContents/_filterTable";
import SearchSectionAutocomplete from "../customSearchSelect/_searchSectionAutocomplete";
import DefaultTable from "../tables/_defaultTable";

//API
import { getApiData } from "../../api/idispenserApi";

function FilterSensor(props) {
  const [data, setData] = useState([]);
  const [remapData, setRemapData] = useState([]);
  const fieldsToSearchIn = [
    "Código sensor",
    "Posición ",
    "HUB ",
    "Cliente ",
    "Almacén ",
    "Tipo ",
  ];
  const fieldsToDisplay = ["Código sensor", "HUB ", "Tipo "];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getApiData("sensor/list");
        const rawData = await response.json();
        setData(rawData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (!data[0]) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    function remap() {
      setRemapData(
        data.map((item) => {
          return {
            id: item.id,
            "Código sensor": item.id,
            "Posición ": item.position,
            "HUB ": item.hub,
            "Cliente ": item.customer,
            "Almacén ": item.storage,
            "Tipo ": item.type,
          };
        })
      );
    }
    remap();
  }, [data]);

  const tabs = useFilterStore((state) => state.filters);
  const selectedTab = tabs.filter((tab) => {
    if (tab.id == props.filter.id) {
      return tab;
    }
  });
  const [selectedItems, setSelectedItems] = useState(selectedTab[0].selected);

  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    setSearchedText(text);
  };

  const itemsFound = remapData.filter((item) => {
    const combinedField = fieldsToDisplay
      .map((field) => {
        return item[field];
      })
      .toString()
      .replaceAll(",", " ");
    if (combinedField.toLowerCase().includes(searchedText.toLowerCase())) {
      return item;
    }
  });

  const addFilterItem = useFilterStore((state) => state.addFilterItem);
  const removeFilterItem = useFilterStore((state) => state.removeFilterItem);
  const handleAdd = (itemToAdd) => {
    addFilterItem(itemToAdd, selectedTab[0]);
    setSelectedItems([...selectedItems, itemToAdd]);
  };
  const handleRemove = (itemToRemove) => {
    removeFilterItem(itemToRemove, selectedTab[0]);
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  const handleResetSelection = () => {
    selectedItems.forEach((item) => {
      removeFilterItem(item, selectedTab[0]);
    });
    setSelectedItems([]);
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
      {remapData[0] && (
        <div className="mb-3">
          {selectedItems.length > 0 && (
            <div className="reset-section">
              <button onClick={handleResetSelection}>
                <span className="icon icon-close"></span>Eliminar selección
              </button>
            </div>
          )}
          <SearchSectionAutocomplete
            options={remapData}
            handleChange={handleChange}
            cellsToDisplay={fieldsToDisplay}
            cellsToSearchIn={fieldsToSearchIn}
            placeholder="Search by code or name"
          />
        </div>
      )}
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
      {remapData[0] && searchedText.length >= 6 && (
        <DefaultTable
          stripped
          multiselect
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          data={itemsFound}
          className="bg-lighter"
        ></DefaultTable>
      )}
    </>
  );
}

export default FilterSensor;
