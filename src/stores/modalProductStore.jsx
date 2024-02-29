import { create } from "zustand";
// import data from "../mocks/modals/_mockModalSensorIdUbicacion.json";
const data = [
  {
    id: "111111",
    idconcentrador: "010000027C72CCC4",
    idproducto: "9928100",
    idultrasensor: "0100000797A75AA3",
    posicion: "C7CB",
  },
  {
    id: "222222",
    idconcentrador: "010000027C72CCC5",
    idproducto: "9928100",
    idultrasensor: "010000196AC408EE",
    posicion: "C7CF",
  },
  {
    id: "333333",
    idconcentrador: "010000027C72CCC6",
    idproducto: "9928100",
    idultrasensor: "010000196AC408EE",
    posicion: "C8CF",
  },
];

const useModalProductStore = create((set) => ({
  data: data,
  selected: "",
  replaceBy: "",
  setData: (newData) => {
    set((state) => ({
      data: newData,
    }));
  },
  setReplaceBy: (replacement) => {
    set(() => ({
      replaceBy: replacement,
    }));
  },
  addSelected: (item) => {
    const str = item.posicion.substring(0, 3);

    set((state) => ({
      selected: [
        ...state.data.filter((it) => {
          if (str === it.posicion.substring(0, 3)) {
            return it;
          }
        }),
        ...state.selected,
      ],
    }));
  },
  removeSelected: (item) => {
    const str = item.posicion.substring(0, 3);
    set((state) => ({
      selected: state.selected.filter((it) => {
        if (it !== undefined && str !== it.posicion.substring(0, 3)) {
          return it;
        }
      }),
    }));
  },
  selectAll: () => {
    set((state) => ({
      selected: state.data,
    }));
  },
  desSelectAll: () => {
    set(() => ({
      selected: "",
    }));
  },
}));

export default useModalProductStore;
