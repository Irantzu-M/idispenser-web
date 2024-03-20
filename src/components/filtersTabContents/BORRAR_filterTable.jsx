import React from "react";
import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import SelectableFilterTableRow from "../filtersSelectableTables/_selectableFilterTableRow";

const FilterTable = (props) => {
  //const data = props.data;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.getData);
  }, [props.getData]);

  const [itemsToSearch, setItemsToSearch] = useState("");
  const [fieldToSearchIn, setFieldToSearchIn] = useState("");

  return (
    <>
      {data[0] && (
        <div className="filters-table--wrapper">
          <ClayTable
            borderedColumns={false}
            borderless={true}
            striped={true}
            className="idispenser-table filters-table mt-3 mb-4"
          >
            <ClayTable.Head key={"table-head"}>
              <ClayTable.Row className={"selectable"}>
                <ClayTable.Cell
                  headingCell
                  className="tableheader--orderable"
                  key={"key--" + data[0].id + "-checkbox"}
                ></ClayTable.Cell>
                {Object.keys(data[0]).map((field) => {
                  if (field != "id" && field != "combinedField") {
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
                <SelectableFilterTableRow
                  tabs={props.tabs}
                  filter={props.filter}
                  item={item}
                  key={"table-body--" + item.id}
                  className={
                    (fieldToSearchIn !== undefined &&
                      fieldToSearchIn !== "" &&
                      !item[fieldToSearchIn]
                        .toLowerCase()
                        .includes(itemsToSearch.toLowerCase()) &&
                      "selectable-item dash") ||
                    (fieldToSearchIn !== undefined &&
                      fieldToSearchIn !== "" &&
                      item[fieldToSearchIn]
                        .toLowerCase()
                        .includes(itemsToSearch.toLowerCase()) &&
                      "selectable-item pop")
                  }
                >
                  {Object.keys(item).map((field) => {
                    if (field != "id" && field != "combinedField") {
                      return (
                        <ClayTable.Cell key={"key--" + field + "-" + item.id}>
                          <span className="txt">{item[field]}</span>
                        </ClayTable.Cell>
                      );
                    }
                  })}
                </SelectableFilterTableRow>
              ))}
            </ClayTable.Body>
          </ClayTable>
        </div>
      )}
    </>
  );
};
export default FilterTable;
