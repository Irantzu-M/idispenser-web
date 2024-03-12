import React from "react";
import { useEffect, useState } from "react";
import ClayTable from "@clayui/table";
import useModalProductStore from "../../../stores/modalProductStore";

function SelectableTableRow(props) {
  const selectedItems = useModalProductStore((state) => state.selected);
  const addSelected = useModalProductStore((state) => state.addSelected);
  const removeSelected = useModalProductStore((state) => state.removeSelected);

  const handleAdd = (clickedItem) => {
    addSelected(clickedItem);
  };
  const handleRemove = (clickedItem) => {
    removeSelected(clickedItem);
  };

  const handleClick = (clickedItem) => {
    if (isSelected) {
      handleRemove(clickedItem);
    } else {
      handleAdd(clickedItem);
    }
  };
  const [isSelected, setIsSelected] = useState(
    selectedItems.indexOf(props.item) > -1
  );

  useEffect(() => {
    setIsSelected(selectedItems.indexOf(props.item) > -1);
  }, [selectedItems]);

  return (
    <>
      <ClayTable.Row
        onClick={() => {
          handleClick(props.item);
        }}
        className="selectable-item"
        key={"table-row" + props.item.id}
      >
        <ClayTable.Cell
          className="selectable-item--checkbox"
          key={"client-cell-" + props.item.id}
        >
          {isSelected ? (
            <span className="icon icon-check-square-o"></span>
          ) : (
            <span className="icon icon-square-o"></span>
          )}
        </ClayTable.Cell>
        {props.children}
      </ClayTable.Row>
    </>
  );
}

export default SelectableTableRow;
