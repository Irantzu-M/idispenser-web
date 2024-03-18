import React, { useEffect, useState } from "react";
import useFilterStore from "../../stores/filtersStore";
import SearchSectionAutocomplete from "../customSearchSelect/_searchSectionAutocomplete";
import DefaultTable from "../tables/_defaultTable";

function FilterSensor(props) {
  const [data, setData] = useFilterStore((state) => state.selecable) || [];
  const [remapData, setRemapData] = useState([{}]);
  const fieldsToSearchIn = [
    "Código sensor",
    "Posición ",
    "HUB ",
    "Cliente ",
    "Almacén ",
    "Tipo ",
  ];
  const fieldsToDisplay = ["Código sensor", "HUB ", "Tipo "];

  // TABS LATERALES
  const tabs = useFilterStore((state) => state.filters);
  const selectedTab = tabs.filter((tab) => {
    if (tab.id == props.filter.id) {
      return tab;
    }
  });

  // TABLA DE ELEMENTOS SELECCIONADOS
  const [selectedItems, setSelectedItems] = useState(selectedTab[0].selected);

  // TEXTO DE BÚSQUEDA
  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    setSearchedText(text);
  };

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

  // LLAMADA A API
  let endpoint = "sensors/list";
  const fetchFilterData = useFilterStore((state) => state.fetchFilterData);

  useEffect(() => {
    if (searchedText.length >= 6) {
      endpoint = `sensors/list` + `?search=${searchedText}`;
      try {
        fetchFilterData(selectedTab, endpoint)
          .then((data) => {
            setRemapData(remap(data));
          })
          .catch((error) => {
            console.error("Fallo al recuperar los datos del sensor", error);
          });
      } catch (error) {
        console.error("Fallo al recuperar los datos del sensor");
      }

      function remap(dataToremap) {
        const rmd = dataToremap.map((item) => {
          return {
            id: item.idSensor,
            "Código sensor": item.idSensor,
            "Posición ": item.sensorPosition,
            "HUB ": item.idConcentrador,
            "Cliente ": item.idCliente,
            "Almacén ": item.almacenName,
            "Tipo ": item.tipoSensor,
          };
        });
        return rmd;
      }
    }
  }, [searchedText]);

  return (
    <>
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
      {selectedItems[0] && (
        <DefaultTable
          striped
          multiselect
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          data={selectedItems}
          customHeader="Artículos seleccionados"
        ></DefaultTable>
      )}
      {searchedText.length >= 6 && (
        <>
          {remapData[0] ? (
            <DefaultTable
              striped
              multiselect
              handleSelect={handleSelect}
              selectedItems={selectedItems}
              data={remapData}
              className="bg-lighter"
            ></DefaultTable>
          ) : (
            <>No hay resultados</>
          )}
        </>
      )}
    </>
  );
}

export default FilterSensor;
