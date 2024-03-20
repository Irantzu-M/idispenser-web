import React from "react";
import ClayTable from "@clayui/table";
import useFilterStore from "../../stores/filtersStore";

function SelectedItemsTable(props) {
  const tabs = useFilterStore((state) => state.filters); //props.tabs;
  const removeItems = useFilterStore((state) => state.removeFilterItem);
  const handleRemove = (itemToRemove) => {
    removeItems(itemToRemove, props.filter);
  };
  const selectedTab = tabs.filter((tab) => {
    if (tab.id == props.filter.id) {
      return tab;
    }
  });
  const selectedItems = selectedTab[0].selected;
  return (
    <>
      <ClayTable
        borderedColumns={false}
        borderless={true}
        striped={true}
        className={"idispenser-table mt-3 mb-4"}
      >
        <ClayTable.Head>
          <ClayTable.Row>
            <ClayTable.Cell
              headingCell
              colSpan={Object.keys(selectedItems[0]).length + 1}
            >
              {"Artículos seleccionados"}
            </ClayTable.Cell>
          </ClayTable.Row>
        </ClayTable.Head>
        <ClayTable.Body>
          {selectedItems.length > 0 &&
            selectedItems.length !== undefined &&
            selectedItems.map((selectedItem) => (
              <ClayTable.Row
                className="selectable-item"
                key={
                  "selected-items--" +
                  props.filter.name +
                  "--row--" +
                  selectedItem.id
                }
                onClick={() => handleRemove(selectedItem)}
              >
                <ClayTable.Cell
                  className="selected-items--cell--checkbox selectable-item--checkbox"
                  key={
                    "selected-items--" +
                    props.filter.name +
                    "--cell--checkbox-" +
                    selectedItem.id +
                    "selected"
                  }
                >
                  <span className="icon icon-check-square-o"></span>
                </ClayTable.Cell>

                {Object.keys(selectedItems[0]).map((cellName) => {
                  if (cellName != "id" && cellName != "combinedField") {
                    return (
                      <ClayTable.Cell
                        key={
                          "selected-items--" +
                          props.filter.name +
                          "--cell--" +
                          cellName +
                          "-" +
                          selectedItem.id
                        }
                      >
                        {selectedItem[cellName]}
                      </ClayTable.Cell>
                    );
                  }
                })}
              </ClayTable.Row>
            ))}
        </ClayTable.Body>
      </ClayTable>
    </>
  );
}
export default SelectedItemsTable;
