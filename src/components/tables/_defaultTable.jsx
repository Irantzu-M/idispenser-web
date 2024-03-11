import React from "react";
import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import TableHeaderOrderable from "./_tableHeaderOrderable";
import { sortASC, sortDES } from "../../functions/functions";
import { apiGetItems } from "../../functions/api";
import FixedTableCols from "./_fixedTableCols";
import SelectableDEFAULTTableRow from "../filtersSelectableTables/_selectableDEFAULTTableRow";
import IDispenserTableCell from "./_idispenserTableCell";
import ClayTableCell from "@clayui/table/lib/Cell";

const DefaultTable = (props) => {
  // PROPERTIES OF TABLE
  const itemType = props.itemType || "";
  const tableQuery = props.tableQuery;
  const striped = props.striped || false;
  const customHeader = props.customHeader || false;
  // Checkbox single select
  const select = props.select || false;
  // Checkbox multiselect
  const multiselect = props.multiselect || false;
  const handleSelect = props.handleSelect || false;
  const selectedItems = props.selectedItems || false;

  const selectableHeader = props.selectableHeader || false;
  const orderable = props.orderable || false;
  const fixedTableCols = props.fixedTableCols || false;
  const openDetails = props.openDetails;

  // Get table data
  const [data, setData] = useState([]);
  useEffect(() => {
    if (tableQuery) {
      apiGetItems(tableQuery).then((rawData) => {
        setData(rawData);
      });
    } else {
      setData(props.data);
    }
  }, [props.itemType, props.data]);

  // Orderable headers
  // TODO - Itemstopop
  const [selected, setSelected] = useState(false);
  const [fieldToSearchIn, setFieldToSearchIn] = useState("");
  const [itemsToPop, setItemsToPop] = useState("");
  const handleItemsToSearchChange = (item, field) => {
    setItemsToPop(item);
    setFieldToSearchIn(field);
  };
  const handleSortDataByFieldASC = (field) => {
    setData(sortASC(data, field));
  };
  const handleSortDataByFieldDES = (field) => {
    setData(sortDES(data, field));
  };

  return (
    <>
      {data[0] && (
        <>
          <div
            className={
              fixedTableCols[0] !== undefined ? "floating-cols-wrapper p-0" : ""
            }
          >
            <div className={"idispenser-table--container " + props.className}>
              <div className="idispenser-table--wrapper">
                <ClayTable
                  borderedColumns={false}
                  borderless={true}
                  hover={true}
                  className={
                    "idispenser-table" + (striped ? " table-striped" : "")
                  }
                >
                  {customHeader && customHeader != "none" && (
                    <ClayTable.Head>
                      <ClayTable.Row>
                        <ClayTable.Cell
                          headingCell
                          colSpan={data[0] && Object.keys(data[0]).length + 1}
                        >
                          {customHeader}
                        </ClayTable.Cell>
                      </ClayTable.Row>
                    </ClayTable.Head>
                  )}
                  {!customHeader && (
                    <ClayTable.Head key={"table-head"}>
                      <ClayTable.Row className={multiselect && "multiselect"}>
                        {data[0] && (multiselect || select) && (
                          <ClayTable.Cell
                            headingCell
                            className="tableheader--orderable"
                            key={"key--" + data[0].id + "-checkbox"}
                          ></ClayTable.Cell>
                        )}
                        {data[0] &&
                          Object.keys(data[0]).map((field) => {
                            if (field != "id" && field != "combinedField") {
                              return (
                                <ClayTable.Cell
                                  headingCell
                                  className="text-uppercase"
                                  key={
                                    "key--" +
                                    data[0].id +
                                    "-" +
                                    field +
                                    "-" +
                                    data[0][field]
                                  }
                                >
                                  {orderable ? (
                                    <TableHeaderOrderable
                                      data={data}
                                      field={field}
                                      change={handleItemsToSearchChange}
                                      handleSortDataByFieldASC={
                                        handleSortDataByFieldASC
                                      }
                                      handleSortDataByFieldDES={
                                        handleSortDataByFieldDES
                                      }
                                      selected={selected}
                                      setSelected={setSelected}
                                    >
                                      {field}
                                    </TableHeaderOrderable>
                                  ) : (
                                    <span>{field}</span>
                                  )}
                                </ClayTable.Cell>
                              );
                            }
                          })}
                      </ClayTable.Row>
                    </ClayTable.Head>
                  )}
                  <ClayTable.Body>
                    {data != undefined &&
                      multiselect &&
                      data.map((item) => (
                        <SelectableDEFAULTTableRow
                          multiselect={multiselect}
                          handleSelect={handleSelect}
                          selectedItems={selectedItems}
                          item={item}
                          key={"table-body--" + itemType + "-" + item.id}
                        >
                          {Object.keys(item).map((field) => {
                            if (field != "id" && field != "combinedField") {
                              return (
                                <IDispenserTableCell
                                  key={"key--" + field + "-" + item.id}
                                  item={item}
                                  itemType={itemType}
                                  field={field}
                                />
                              );
                            }
                          })}
                        </SelectableDEFAULTTableRow>
                      ))}
                    {data != undefined &&
                      select &&
                      data.map((item) => (
                        <SelectableDEFAULTTableRow
                          handleSelect={handleSelect}
                          selectedItems={selectedItems}
                          item={item}
                          key={"table-body--" + itemType + "-" + item.id}
                        >
                          {Object.keys(item).map((field) => {
                            if (field != "id" && field != "combinedField") {
                              return (
                                <IDispenserTableCell
                                  key={"key--" + field + "-" + item.id}
                                  item={item}
                                  itemType={itemType}
                                  field={field}
                                />
                              );
                            }
                          })}
                        </SelectableDEFAULTTableRow>
                      ))}
                    {data != undefined &&
                      !multiselect &&
                      !select &&
                      data.map((item) => (
                        <ClayTable.Row
                          key={"table-body--" + itemType + "-" + item.id}
                        >
                          {Object.keys(item).map((field) => {
                            if (field != "id") {
                              return (
                                <IDispenserTableCell
                                  key={"key--" + field + "-" + item.id}
                                  item={item}
                                  itemType={itemType}
                                  field={field}
                                />
                              );
                            }
                          })}
                        </ClayTable.Row>
                      ))}
                  </ClayTable.Body>
                </ClayTable>

                {props.fixedTableCols !== undefined &&
                  props.fixedTableCols[0] !== "" && (
                    <>
                      <FixedTableCols
                        data={data}
                        itemType={itemType}
                        fixedTableCols={fixedTableCols}
                      />
                    </>
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default DefaultTable;
