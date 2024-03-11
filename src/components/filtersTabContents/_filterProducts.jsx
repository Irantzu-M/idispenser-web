import React, { useEffect, useState } from "react";
import useFilterStore from "../../stores/filtersStore";
import SearchSectionAutocomplete from "../customSearchSelect/_searchSectionAutocomplete";
import DefaultTable from "../tables/_defaultTable";

function FilterProducts(props) {
  const [data, setData] = useState([]);
  const [remapData, setRemapData] = useState([]);
  const fieldsToSearchIn = ["Código de artículo", "Descripción "];
  const fieldsToDisplay = ["Código de artículo", "Descripción "];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:5500/src/mocks/filters/_mockProducts.json"
        );
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
            "Código de artículo": item.reference,
            "Descripción ": item.label,
          };
        })
      );
    }
    remap();
  }, [data]);

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

  const handleResetSelection = () => {
    selectedItems.forEach((item) => {
      removeFilterItem(item, selectedTab[0]);
    });
    setSelectedItems([]);
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
            cellstoSearchIn={fieldsToSearchIn}
            cellsToDisplay={fieldsToDisplay}
            placeholder="Search by code or name"
          />
        </div>
      )}
      {selectedItems.length > 0 && (
        <DefaultTable
          striped
          multiselect
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          data={selectedItems}
          customHeader="Artículos seleccionados"
        ></DefaultTable>
      )}
      {remapData[0] && searchedText.length >= 6 && (
        <>
          <DefaultTable
            striped
            multiselect
            handleSelect={handleSelect}
            selectedItems={selectedItems}
            data={itemsFound}
            className="bg-lighter"
          ></DefaultTable>
        </>
      )}
    </>
  );
}

export default FilterProducts;
