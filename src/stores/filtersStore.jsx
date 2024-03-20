import React from "react";

import { create } from "zustand";
import { fetchApi } from "../api/idispenserApi";

const dataFilterList = [
  {
    id: "1",
    name: "clients",
    label: "Cliente",
    selectable: [],
    selected: [],
  },
  {
    id: "2",
    name: "almacenes",
    label: "Almacén",
    selectable: [],
    selected: [],
  },
  {
    id: "3",
    name: "products",
    label: "Artículo",
    selectable: [],
    selected: [],
  },
  {
    id: "4",
    name: "hubs",
    label: "HUB",
    selectable: [],
    selected: [],
  },
  {
    id: "5",
    name: "sensors",
    label: "Sensor",
    selectable: [],
    selected: [],
  },
  {
    id: "6",
    name: "sensortype",
    label: "Tipología de sensor",
    selectable: [
      { id: "PUSHERS", label: "pusher", selected: false },
      { id: "ULTRASOUND", label: "ustrasound", selected: false },
      { id: "WEIGHING", label: "weighing", selected: false },
      { id: "CUSTODY", label: "custody", selected: false },
    ],
    selected: [],
  },
];

const dataButtons = [
  {
    id: "1",
    name: "articulos",
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
    try {
      const response = await fetchApi(endpoint);
      const rawData = await response["items"];

      if (rawData[0]) {
        set((state) => ({
          filters: state.filters.map((tab) => {
            if (parentTab.id === tab.id) {
              tab.selectable = rawData;
            }
            return tab;
          }),
        }));
        return rawData;
      }
    } catch (error) {
      throw error;
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
