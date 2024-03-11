import React from "react";

import { create } from "zustand";
import { idispenserApi } from "../api/idispenserApi";

const dataFilterList = [
  {
    id: "1",
    name: "client",
    label: { es: "Cliente", en: "Client" },
    selectable: [],
    selected: [],
  },
  {
    id: "2",
    name: "storage",
    label: { es: "Almacén", en: "Storage" },
    selectable: [],
    selected: [],
  },
  {
    id: "3",
    name: "product",
    label: { es: "Artículo", en: "Product" },
    selectable: [],
    selected: [],
  },
  {
    id: "4",
    name: "hub",
    label: { es: "HUB", en: "HUB" },
    selectable: [],
    selected: [],
  },
  {
    id: "5",
    name: "sensor",
    label: { es: "Sensor", en: "Sensor" },
    selectable: [],
    selected: [],
  },
  {
    id: "6",
    name: "sensortype",
    label: { es: "Tipología de sensor", en: "Sensor type" },
    selectable: [],
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
  isLoading: false,
  fetchFilterData: async (endpoint) => {
    set({ isLoading: true });
    try {
      const response = await idispenserApi.fetchApi(endpoint);
      const rawData = await response["items"];
      if (rawData.length > 0) {
        setRemapData(remap(rawData));
      } else {
        setRemapData([{ "": "no hay resultados" }]);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ isLoading: false });
    }
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
