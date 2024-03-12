import React from "react";

import { create } from "zustand";
// import dataFilterList from "./_filterList.json";
// import dataButtons from "./_buttonList.json";
const dataFilterList = [
  {
    id: "1",
    name: "client",
    label: { es: "Cliente", en: "Client" },
    selected: [],
  },
  {
    id: "2",
    name: "storage",
    label: { es: "Almacén", en: "Storage" },
    selected: [],
  },
  {
    id: "3",
    name: "product",
    label: { es: "Artículo", en: "Product" },
    selected: [],
  },
  {
    id: "4",
    name: "hub",
    label: { es: "HUB", en: "HUB" },
    selected: [],
  },
  {
    id: "5",
    name: "sensor",
    label: { es: "Sensor", en: "Sensor" },
    selected: [],
  },
  {
    id: "6",
    name: "sensortype",
    label: { es: "Tipología de sensor", en: "Sensor type" },
    selected: [],
  },
];
const dataButtons = [
  {
    id: "1",
    name: "products",
    label: {
      es: "Artículos",
      en: "Products",
    },
  },
  {
    id: "2",
    name: "hubs",
    label: {
      es: "Hubs",
      en: "Hubs",
    },
  },
  {
    id: "3",
    name: "sensors",
    label: {
      es: "Sensores",
      en: "Sensors",
    },
  },
  {
    id: "4",
    name: "stock",
    label: {
      es: "Stock",
      en: "Stock",
    },
  },
  {
    id: "5",
    name: "error",
    label: {
      es: "Errores Artículo / Sensor",
      en: "Product / Sensor error",
    },
  },
  {
    id: "6",
    name: "huberror",
    label: {
      es: "Errores Hub",
      en: "Hub errors",
    },
  },
];
const useFilterStore = create((set) => ({
  filters: dataFilterList,
  active: 0,
  setActive: (index) => {
    set(() => ({
      active: index,
    }));
  },
  addFilterItem: (item, parentTab) => {
    set((state) => ({
      filters: state.filters.map((tab) => {
        if (parentTab.id === tab.id) {
          tab.selected = [item, ...tab.selected];
        }
        return tab;
      }),
    }));
  },
  removeFilterItem: (item, parentTab) => {
    set((state) => ({
      filters: state.filters.map((tab) => {
        if (parentTab.id === tab.id) {
          tab.selected = tab.selected.filter((compareItem) => {
            if (compareItem.id !== item.id) {
              return compareItem;
            }
          });
        }
        return tab;
      }),
    }));
  },
  restoreSingleFilter: (filter) => {
    set((state) => ({
      filters: state.filters.map((tab) => {
        if (filter.id === tab.id) {
          tab.selected = [];
        }
        return tab;
      }),
    }));
  },
  restoreFilters: () => {
    set((state) => ({
      filters: state.filters.map((item) => {
        item.selected = [];
        return item;
      }),
    }));
  },
}));

const useFilterButtonsStore = create((set) => ({
  buttons: dataButtons,
  itemTypeToFind: "",
  setItemTypeToFind: (itemType) => {
    set(() => ({
      itemTypeToFind: itemType,
    }));
    window.location.hash = "#results-block";
  },
}));

export default useFilterStore;
export { useFilterButtonsStore };
