import React from "react";
import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
// import mockData from "../../../mocks/modals/_mockModalSensorIdUbicacion.json";
const mockData = [
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
import useModalProductStore from "../../../stores/modalProductStore";
import SelectableTableRow from "./_modalSelectableTableRow";

const SensorSelectTable = (props) => {
  // TODO - CAMBIAR LOS DATOS A UNA CONSULTA
  const data = mockData;

  // TODO - hacer otra llamada cuando se clicke en la cabecera

  // Gets the text related to each status value

  const allItems = useModalProductStore((state) => state.data);
  const selected = useModalProductStore((state) => state.selected);
  const [checkSelected, setCheckSelected] = useState(false);
  const selectAll = useModalProductStore((state) => state.selectAll);
  const desSelectAll = useModalProductStore((state) => state.desSelectAll);
  const handleSelectAll = () => {
    if (selected.length === allItems.length) {
      desSelectAll();
    } else {
      selectAll();
    }
  };

  useEffect(() => {
    setCheckSelected(selected.length === allItems.length);
  }, [selected]);
  return (
    <>
      <div className="results--table col-12">
        <div className="results-table--wrapper">
          <ClayTable
            borderedColumns={false}
            borderless={true}
            striped={false}
            className="idispenser-table results-table table-borderless"
          >
            <ClayTable.Head key={"table-head"}>
              <ClayTable.Row className={"selectable"} onClick={handleSelectAll}>
                <ClayTable.Cell
                  className="selected-items--cell--checkbox selectable-item--checkbox"
                  key={"modal--selected-items--all"}
                >
                  {checkSelected ? (
                    <span className="icon icon-check-square"></span>
                  ) : (
                    <span className="icon icon-square-o"></span>
                  )}
                </ClayTable.Cell>
                {Object.keys(data[0]).map((field) => {
                  if (field) {
                    return (
                      <ClayTable.Cell
                        headingCell
                        className="tableheader--orderable"
                        key={
                          "key--" +
                          data[0].id +
                          "-" +
                          field +
                          "-" +
                          data[0][field]
                        }
                      >
                        {field}
                      </ClayTable.Cell>
                    );
                  }
                })}
              </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
              {data.map((item) => (
                <SelectableTableRow
                  item={item}
                  key={"table-body--" + item.id}
                  className={"selectable-item "}
                >
                  {Object.keys(item).map((field) => {
                    if (field && field != "combinedField") {
                      return (
                        <ClayTable.Cell key={"key--" + field + "-" + item.id}>
                          <span className="txt">{item[field]}</span>
                        </ClayTable.Cell>
                      );
                    }
                  })}
                </SelectableTableRow>
              ))}
            </ClayTable.Body>
          </ClayTable>
        </div>
      </div>
    </>
  );
};
export default SensorSelectTable;
