import React from "react";
import { useEffect, useState } from "react";
// import SelectedItemsTable from "../filtersSelectableTables/_selectedItemsTable";
import useFilterStore from "../../stores/filtersStore";
// import FilterTable from "../filtersTabContents/_filterTable";
import SearchSectionAutocomplete from "../customSearchSelect/_searchSectionAutocomplete";
import DefaultTable from "../tables/_defaultTable";

import { getApiData } from "../../api/idispenserApi";

function FilterHubs(props) {
  const [data, setData] = useState([]);
  const [remapData, setRemapData] = useState([]);
  const fieldsToSearchIn = ["Código HUB", "Cliente ", "Almacén ", "Alias "];
  const fieldsToDisplay = ["Código HUB", "Almacén ", "Alias "];

  // TODO - Use api
  // useEffect(() => {
  //   async function fetchData() {
  //     fetch("http://127.0.0.1:5500/src/mocks/filters/_mockHubs.json")
  //       .then((response) => response.json())
  //       .then((rawData) => setData(rawData));
  //   }
  //   if (!data[0]) {
  //     fetchData();
  //   }
  //   async function remap() {
  //     setRemapData(
  //       data.map((item) => {
  //         return {};
  //       })
  //     );
  //   }
  //   remap();
  // }, [data]);

  // useEffect(() => {
  //   async function remap() {
  //     setRemapData(
  //       data.map((item) => {
  //         return {
  //           id: item.id,
  //           "Código HUB": item.id,
  //           "Cliente ": item.client,
  //           "Almacén ": item.storage,
  //           "Alias ": item.label,
  //         };
  //       })
  //     );
  //   }
  //   remap();
  // }, [data]);

  let endpoint = "hubs/list";
  useEffect(() => {
    //console.log("search", searchedText.length, searchedText);
    if (searchedText.length >= 6) {
      endpoint += `?search=${searchedText}`;
      async function fetchData() {
        try {
          const response = await getApiData(endpoint);
          const rawData = await response["items"];
          if (rawData.length > 0) {
            setRemapData(remap(rawData));
          } else {
            setRemapData([{ "": "no hay resultados" }]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      if (!data[0]) {
        fetchData();
      }

      function remap(dataToremap) {
        const rmd = dataToremap.map((item) => {
          return {
            id: item.idConcentrador,
            "Código HUB": item.idConcentrador,
            "Cliente ": item.idCliente,
            "Almacén ": item.idAlmacenQuirofano,
            "Alias ": item.aliasIDC,
          };
        });
        return rmd;
      }
    }
  }, [searchedText]);

  // STORE FUNCTIONS
  const tabs = useFilterStore((state) => state.filters);
  const selectedTab = tabs.filter((tab) => {
    if (tab.id == props.filter.id) {
      return tab;
    }
  });
  const [selectedItems, setSelectedItems] = useState(selectedTab[0].selected); // Estado de elementos seleccionados

  // SEARCH TEXT
  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    setSearchedText(text);
  };
  // ITEMS TO DISPLAY IN THE TABLE AFTER SEARCHING
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

  //SELECTABLE para usar tablas default
  const addFilterItem = useFilterStore((state) => state.addFilterItem);
  const removeFilterItem = useFilterStore((state) => state.removeFilterItem); // Función para eliminar elementos seleccionados
  const handleAdd = (itemToAdd) => {
    addFilterItem(itemToAdd, selectedTab[0]);
    setSelectedItems([...selectedItems, itemToAdd]); // Agregar el elemento seleccionado al estado
  };
  const handleRemove = (itemToRemove) => {
    removeFilterItem(itemToRemove, selectedTab[0]); // Llamar a la función para eliminar elementos seleccionados
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove)); // Actualizar el estado de los elementos seleccionados
  };

  const handleResetSelection = () => {
    // Lógica para restablecer los elementos seleccionados
    // Eliminar todos los elementos seleccionados
    selectedItems.forEach((item) => {
      removeFilterItem(item, selectedTab[0]); // Llamar a la función para eliminar elementos seleccionados
    });

    // Limpiar la lista de elementos seleccionados
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
          striped
          multiselect
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          data={selectedItems}
          customHeader="Artículos seleccionados"
        ></DefaultTable>
      )}
      {remapData[0] && searchedText.length >= 6 && (
        <DefaultTable
          striped
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

export default FilterHubs;
