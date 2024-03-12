import React from "react";
import { useEffect, useState } from "react";
import ClayTable from "@clayui/table";

function SelectableDEFAULTTableRow(props) {
  const multiselect = props.multiselect || false;
  const selectedItems = props.selectedItems;
  const handleSelect = props.handleSelect;

  const [checkSelected, setCheckSelected] = useState();

  const handleClick = (clickedItem) => {
    setCheckSelected(!checkSelected);
    handleSelect(checkSelected, clickedItem);
  };

  // Se ejecuta la primera vez
  useEffect(() => {
    if (selectedItems) {
      setCheckSelected(selectedItems.indexOf(props.item) > -1);
    } else {
      setCheckSelected(false);
    }
  }, []);

  // Se actualiza con el dato
  useEffect(() => {
    if (selectedItems) {
      setCheckSelected(selectedItems.indexOf(props.item) > -1);
    } else {
      setCheckSelected(false);
    }
  }, [selectedItems]);

  return (
    <>
      <ClayTable.Row
        onClick={() => {
          handleClick(props.item);
        }}
        key={"table-row" + props.item.id}
      >
        <ClayTable.Cell
          className="selectable-item--checkbox"
          key={"client-cell-" + props.item.id}
        >
          {multiselect ? (
            <>
              {checkSelected ? (
                <span className="icon icon-check-square-o"></span>
              ) : (
                <span className="icon icon-square-o"></span>
              )}
            </>
          ) : (
            <>
              {checkSelected ? (
                <span className="icon icon-circle"></span>
              ) : (
                <span className="icon icon-circle-o"></span>
              )}
            </>
          )}
        </ClayTable.Cell>
        {props.children}
      </ClayTable.Row>
    </>
  );
}

export default SelectableDEFAULTTableRow;
