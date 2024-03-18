import { create } from "zustand";
import { fetchApi } from "../api/idispenserApi";

const useResultsStore = create((set) => ({
  data: [{}],
  setData: (newData) => {
    set(() => ({
      data: newData,
    }));
  },

  sortDataByFieldASC: (field) => {
    const getDataCopy = (initialData) => {
      const dataCopy = [...initialData];
      const newData = dataCopy.sort((itemA, itemB) => {
        if (typeof itemA[field] == "number") {
          return itemA[field] - itemB[field];
        } else {
          return itemA[field]?.localeCompare(itemB[field]);
        }
      });
      return newData;
    };
    set((state) => ({
      data: getDataCopy(state.data),
    }));
  },
  sortDataByFieldDES: (field) => {
    const getDataCopy = (initialData) => {
      const dataCopy = [...initialData];
      const newData = dataCopy.sort((itemA, itemB) => {
        if (typeof itemB[field] == "number") {
          return itemB[field] - itemA[field];
        } else {
          return itemB[field]?.localeCompare(itemA[field]);
        }
      });
      return newData;
    };
    set((state) => ({
      data: getDataCopy(state.data),
    }));
  },
  // filterByField: (field, value) => {
  //   set((state) => ({
  //     data: state.data.filter((item) =>
  //       String(item[field]).toLowerCase().includes(String(value).toLowerCase())
  //     ),
  //   }));
  // },
  addMessage: (message, itemId) => {
    set((state) => ({
      data: state.data.map((item) => {
        if (item.id === itemId) {
          const newItem = { ...item, ["comentario"]: message };
          return newItem;
        } else {
          return item;
        }
      }),
    }));
  },
  fetchResultData: async (endpoint) => {
    let resultData;
    try {
      const response = await fetchApi(endpoint);
      const rawData = await response["items"];

      if (rawData[0]) {
        resultData = rawData;
        set(() => ({
          data: resultData,
        }));
      }
      return rawData;
    } catch (error) {
      throw error;
    }
  },
  updateResults: false,
  setUpdateResults: (value) => {
    set(() => ({
      updateResults: value,
    }));
  },
}));

export default useResultsStore;
