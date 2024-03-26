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
    hover = props.hover || false,
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

    fieldsToDisplay = props.fieldsToDisplay || false,
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
    if (Array.isArray(fieldsToDisplay)) {
      fieldsToDisplay.forEach((field) => allFields.add(field));
    } else {
      data.forEach((item) => {
        Object.keys(item).forEach((field) => {
          // Si el campo no está en fixedTableCols, agregarlo al conjunto
          if (
            (!fixedTableCols || !fixedTableCols.includes(field)) &&
            (!fieldsToDisplay || !fieldsToDisplay.includes(field))
          ) {
            allFields.add(field);
          }
        });
      });
    }
    return Array.from(allFields);
  };

  // const f = "idAlmacen";
  // console.log("LFT: ", Liferay.Language.get("com.hartmann.idispenser." + f));

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
                  hover={hover}
                  className={
                    "idispenser-table" +
                    (striped != false ? " table-striped" : "")
                  }
                >
                  {customHeader && customHeader != "none" ? (
                    <ClayTable.Head>
                      <ClayTable.Row>
                        <ClayTable.Cell
                          key={generateUniqueId()}
                          headingCell
                          colSpan={
                            multiselect
                              ? getAllFields().length + 1
                              : getAllFields().length
                          }
                        >
                          {customHeader + " "}
                        </ClayTable.Cell>
                      </ClayTable.Row>
                    </ClayTable.Head>
                  ) : (
                    <ClayTable.Head key={generateUniqueId()}>
                      <ClayTable.Row className={multiselect && "multiselect"}>
                        {data != [] && (multiselect || select) && (
                          <ClayTable.Cell
                            headingCell
                            className={"tableheader--selectable "}
                            key={generateUniqueId()}
                          >
                            &nbsp;
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
                                    <span>
                                      {field +
                                        " - TERM :: " +
                                        "com.hartmann.idispenser." +
                                        field +
                                        " - LANGUAGE :: " +
                                        Liferay.Language.get(
                                          "com.hartmann.idispenser." + field
                                        )}
                                      {/* {Liferay.Language.get(
                                        "com.hartmann.idispenser.idAlmacen"
                                      ) != ""
                                        ? Liferay.Language.get(
                                            "com.hartmann.idispenser.idArticulo"
                                          )
                                        : field} */}
                                    </span>
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
                      hover={hover}
                      striped={striped}
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
