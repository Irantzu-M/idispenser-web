import React, { useEffect, useState } from "react";
import ClayTable from "@clayui/table";
import { generateUniqueId, sortASC, sortDES } from "../../functions/functions";
import FixedTableCols from "./_fixedTableCols";
import TableHeaderOrderable from "./_tableHeaderOrderable";
import SelectableDEFAULTTableRow from "../filtersSelectableTables/_selectableDEFAULTTableRow";
import IDispenserTableCell from "./_idispenserTableCell";

const DefaultTable = (props) => {
  // PROPERTIES OF TABLE
  const itemType = props.itemType || "";
  const endpoint = props.endpoint || "";
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

  const uniqueId = generateUniqueId();

  // Get table data
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [initialData]);

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
    data.forEach((item) => {
      Object.keys(item).forEach((field) => allFields.add(field));
    });
    return Array.from(allFields);
  };

  return (
    <>
      {data.length > 0 ? (
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
                  {customHeader && customHeader !== "none" && (
                    <ClayTable.Head>
                      <ClayTable.Row>
                        <ClayTable.Cell
                          headingCell
                          colSpan={getAllFields().length + 1}
                        >
                          {customHeader}
                        </ClayTable.Cell>
                      </ClayTable.Row>
                    </ClayTable.Head>
                  )}
                  {!customHeader && (
                    <ClayTable.Head>
                      <ClayTable.Row>
                        {getAllFields().map((field) => (
                          <ClayTable.Cell
                            headingCell
                            key={field}
                            className="text-uppercase"
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
                        ))}
                      </ClayTable.Row>
                    </ClayTable.Head>
                  )}
                  <ClayTable.Body>
                    {data.map((item) => (
                      <ClayTable.Row key={generateUniqueId()}>
                        {getAllFields().map((field) => (
                          <IDispenserTableCell
                            key={generateUniqueId()}
                            item={item}
                            itemType={itemType}
                            field={field}
                          />
                        ))}
                      </ClayTable.Row>
                    ))}
                  </ClayTable.Body>
                </ClayTable>
                {fixedTableCols !== undefined && fixedTableCols[0] !== "" && (
                  <FixedTableCols
                    data={data}
                    itemType={itemType}
                    fixedTableCols={fixedTableCols}
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
