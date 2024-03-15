import React from "react";

import { create } from "zustand";
import { fetchApi } from "../api/idispenserApi";

const dataFilterList = [
  {
    id: "1",
    name: "client",
    label: "Cliente",
    selectable: [],
    selected: [],
  },
  {
    id: "2",
    name: "storage",
    label: "Almacén",
    selectable: [],
    selected: [],
  },
  {
    id: "3",
    name: "product",
    label: "Artículo",
    selectable: [],
    selected: [],
  },
  {
    id: "4",
    name: "hub",
    label: "HUB",
    selectable: [],
    selected: [],
  },
  {
    id: "5",
    name: "sensor",
    label: "Sensor",
    selectable: [],
    selected: [],
  },
  {
    id: "6",
    name: "sensortype",
    label: "Tipología de sensor",
    selectable: [],
    selected: [],
  },
];

const dataButtons = [
  {
    id: "1",
    name: "products",
    label: "Artículos",
  },
  {
    id: "2",
    name: "hubs",
    label: "Hubs",
  },
  {
    id: "3",
    name: "sensors",
    label: "Sensores",
  },
  {
    id: "4",
    name: "stock",
    label: "Stock",
  },
  {
    id: "5",
    name: "error",
    label: "Errores Artículo / Sensor",
  },
  {
    id: "6",
    name: "huberror",
    label: "Errores Hub",
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
  fetchFilterData: async (parentTab, endpoint) => {
    let selectableData;
    try {
      const response = await fetchApi(endpoint);
      const rawData = await response["items"];

      if (rawData[0]) {
        selectableData = rawData;
      }
    } catch (error) {
      throw error;
    }
    set((state) => ({
      filters: state.filters.map((tab) => {
        if (parentTab.id === tab.id) {
          tab.selectable = newData;
        }
        return tab;
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
