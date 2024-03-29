import { create } from "zustand";

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
}));

export default useResultsStore;
