import React from "react";
import ClayTable from "@clayui/table";
import useFilterStore from "../../stores/filtersStore";

function SelectableFilterTableRow(props) {
  const checkSelected =
    useFilterStore((state) =>
      state.filters[state.filters.indexOf(props.filter)].selected.indexOf(
        props.item
      )
    ) > -1;

  const addFilterItem = useFilterStore((state) => state.addFilterItem);

  const removeFilterItem = useFilterStore((state) => state.removeFilterItem);

  const handleAdd = (clickedItem) => {
    addFilterItem(clickedItem, props.filter);
  };
  const handleRemove = (clickedItem) => {
    removeFilterItem(clickedItem, props.filter);
  };

  const handleClick = (clickedItem) => {
    if (checkSelected) {
      handleRemove(clickedItem);
    } else {
      handleAdd(clickedItem);
    }
  };

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
          {checkSelected ? (
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

export default SelectableFilterTableRow;
