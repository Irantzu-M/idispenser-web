import React, { useEffect, useState } from "react";
import useFilterStore from "../../stores/filtersStore";
import SearchSectionAutocomplete from "../customSearchSelect/_searchSectionAutocomplete";
import DefaultTable from "../tables/_defaultTable";

function FilterSensor(props) {
  const [data, setData] = useFilterStore((state) => state.selecable) || [];
  const [remapData, setRemapData] = useState([{}]);
  // const fieldsToSearchIn = [
  //   "Código sensor",
  //   "Posición ",
  //   "HUB ",
  //   "Cliente ",
  //   "Almacén ",
  //   "Tipo ",
  // ];
  // const fieldsToDisplay = ["ID almacén", "Nombre", "ID Cliente", "Descripción"];

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
  // const handleChange = (text) => {
  //   setSearchedText(text);
  // };

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

  // const handleResetSelection = () => {
  //   selectedItems.forEach((item) => {
  //     removeFilterItem(item, selectedTab[0]);
  //     setSearchedText("");
  //   });
  //   setSelectedItems([]);
  // };

  const handleSelect = (checkSelected, item) => {
    if (!checkSelected) {
      handleAdd(item);
    } else {
      handleRemove(item);
    }
  };

  // LLAMADA A API
  let endpoint = "clients";
  const fetchFilterData = useFilterStore((state) => state.fetchFilterData);

  useEffect(() => {
    // if (searchedText.length >= 6) {
    endpoint = `clients` + `?search=${searchedText}`;
    try {
      fetchFilterData(selectedTab, endpoint)
        .then((data) => {
          setRemapData(remap(data));
        })
        .catch((error) => {
          console.error("Fallo", error);
        });
    } catch (error) {
      console.error("Fallo al recuperar los datos del cliente");
    }

    function remap(dataToremap) {
      const rmd = dataToremap.map((item) => {
        return {
          id: item.idClient,
          "ID cliente": item.idClient,
          "Nombre ": item.cliKanal + " " + item.cliname1 + " " + item.cliname2,
        };
      });
      return rmd;
    }
    // }
    // }, [searchedText]);
  }, []);

  return (
    <>
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
      {remapData[0].id ? (
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
  );
}

export default FilterSensor;
