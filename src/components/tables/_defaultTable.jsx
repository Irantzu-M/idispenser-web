import React, { useEffect, useState } from "react";
import ClayTable from "@clayui/table";

import TableHeaderOrderable from "./_tableHeaderOrderable";
import { generateUniqueId, sortASC, sortDES } from "../../functions/functions";
import FixedTableCols from "./_fixedTableCols";
import SelectableDEFAULTTableRow from "../filtersSelectableTables/_selectableDEFAULTTableRow";
import IDispenserTableCell from "./_idispenserTableCell";

const DefaultTable = (props) => {
  // PROPERTIES OF TABLE
  const {
    itemType = props.itemType || "",
    endpoint = props.endpoint || "",
    striped = props.striped || false,
    customHeader = props.customHeader || false,
    // Checkbox single select
    select = props.select || false,
    // Checkbox multiselect
    multiselect = props.multiselect || false,
    handleSelect = props.handleSelect || false,
    selectedItems = props.selectedItems || false,

    selectableHeader = props.selectableHeader || false,
    orderable = props.orderable || false,
    fixedTableCols = props.fixedTableCols || false,
    openDetails = props.openDetails || false,
  } = props;

  // Get table data
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // Orderable headers
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

  const getAllFields = () => {
    const allFields = new Set();
    if (Array.isArray(fixedTableCols)) {
      fixedTableCols.forEach((field) => allFields.add(field));
    }

    data.forEach((item) => {
      Object.keys(item).forEach((field) => {
        // Si el campo no está en fixedTableCols, agregarlo al conjunto
        if (!fixedTableCols || !fixedTableCols.includes(field)) {
          allFields.add(field);
        }
      });
    });
    return Array.from(allFields);
  };

  const handleOpenModal = (item) => {
    props.openDetails(item);
    setSelected(true);
  };

  return (
    <>
      {data != undefined && data != [] ? (
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
                          key={generateUniqueId()}
                          headingCell
                          colSpan={data != [] && getAllFields().length + 1}
                        >
                          {customHeader}
                        </ClayTable.Cell>
                      </ClayTable.Row>
                    </ClayTable.Head>
                  )}
                  {!customHeader && (
                    <ClayTable.Head key={generateUniqueId()}>
                      <ClayTable.Row className={multiselect && "multiselect"}>
                        {data != [] && (multiselect || select) && (
                          <ClayTable.Cell
                            headingCell
                            className={"tableheader--selectable "}
                            key={generateUniqueId()}
                          >
                            -
                          </ClayTable.Cell>
                        )}
                        {data != [] &&
                          getAllFields().map((field) => {
                            if (field != "id" && field != "combinedField") {
                              return (
                                <ClayTable.Cell
                                  headingCell
                                  className={"text-uppercase "}
                                  key={generateUniqueId()}
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
                    {multiselect &&
                      data.map((item) => (
                        <SelectableDEFAULTTableRow
                          multiselect={multiselect}
                          handleSelect={handleSelect}
                          selectedItems={selectedItems}
                          item={item}
                          key={generateUniqueId()}
                        >
                          {getAllFields().map((allField) => {
                            console.log("164");
                            if (
                              item[allField] != undefined &&
                              item[allField] != "" &&
                              allField != "id" &&
                              allField != "combinedField"
                            ) {
                              return (
                                <IDispenserTableCell
                                  key={generateUniqueId()}
                                  item={item}
                                  itemType={itemType}
                                  field={allField}
                                />
                              );
                            } else {
                              return (
                                <ClayTable.Cell key={generateUniqueId()}>
                                  &nbsp;
                                </ClayTable.Cell>
                              );
                            }
                          })}
                        </SelectableDEFAULTTableRow>
                      ))}

                    {select &&
                      data.map((item) => (
                        <SelectableDEFAULTTableRow
                          handleSelect={handleSelect}
                          selectedItems={selectedItems}
                          item={item}
                          key={generateUniqueId()}
                        >
                          {data != [] &&
                            getAllFields().map((allField) => {
                              if (
                                item[allField] != undefined &&
                                item[allField] != "" &&
                                allField != "id" &&
                                allField != "combinedField"
                              ) {
                                return (
                                  <IDispenserTableCell
                                    key={generateUniqueId()}
                                    item={item}
                                    itemType={itemType}
                                    field={allField}
                                  />
                                );
                              } else {
                                return (
                                  <ClayTable.Cell key={generateUniqueId()}>
                                    &nbsp;
                                  </ClayTable.Cell>
                                );
                              }
                            })}
                        </SelectableDEFAULTTableRow>
                      ))}

                    {openDetails &&
                      data.map((item) => (
                        <ClayTable.Row
                          className={
                            (fieldToSearchIn != undefined &&
                              fieldToSearchIn != "" &&
                              !item[fieldToSearchIn]
                                .toLowerCase()
                                .includes(itemsToPop.toLowerCase()) &&
                              "selectable-item dash") ||
                            (fieldToSearchIn != undefined &&
                              fieldToSearchIn != "" &&
                              itemsToPop != "" &&
                              item[fieldToSearchIn]
                                .toLowerCase()
                                .includes(itemsToPop.toLowerCase()) &&
                              "selectable-item pop ")
                          }
                          onClick={() => handleOpenModal(item)}
                          key={generateUniqueId()}
                        >
                          {data != [] &&
                            getAllFields().map((allField) => {
                              if (
                                item[allField] != undefined &&
                                item[allField] != "" &&
                                allField != "id" &&
                                allField != "combinedField"
                              ) {
                                return (
                                  <IDispenserTableCell
                                    key={generateUniqueId()}
                                    item={item}
                                    itemType={itemType}
                                    field={allField}
                                  />
                                );
                              } else {
                                return (
                                  <ClayTable.Cell key={generateUniqueId()}>
                                    &nbsp;
                                  </ClayTable.Cell>
                                );
                              }
                            })}
                        </ClayTable.Row>
                      ))}

                    {!multiselect &&
                      !select &&
                      !openDetails &&
                      data.map((item) => (
                        <ClayTable.Row key={generateUniqueId()}>
                          {data != [] &&
                            getAllFields().map((allField) => {
                              if (
                                item[allField] != undefined &&
                                item[allField] != "" &&
                                allField != "id" &&
                                allField != "combinedField"
                              ) {
                                return (
                                  <IDispenserTableCell
                                    key={generateUniqueId()}
                                    item={item}
                                    itemType={itemType}
                                    field={allField}
                                  />
                                );
                              } else {
                                return (
                                  <ClayTable.Cell key={generateUniqueId()}>
                                    &nbsp;
                                  </ClayTable.Cell>
                                );
                              }
                            })}
                        </ClayTable.Row>
                      ))}
                  </ClayTable.Body>
                </ClayTable>

                {props.fixedTableCols !== undefined &&
                  props.fixedTableCols[0] !== "" && (
                    <FixedTableCols
                      data={data}
                      itemType={itemType}
                      fixedTableCols={fixedTableCols}
                      fieldToSearchIn={fieldToSearchIn}
                      itemsToPop={itemsToPop}
                    />
                  )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mb-4">No hay resultados</div>
      )}
    </>
  );
};
export default DefaultTable;
