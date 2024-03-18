import React from "react";
import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import useResultsStore from "../../stores/resultsStore";
import TableHeaderOrderable from "../tables/_tableHeaderOrderable";
import CommentTooltip from "../tooltips/_commentTooltip";
import { capitalize, getStatusColor } from "../../functions/functions";
import StatusTooltip from "../tooltips/_statusTooltip";
import Status from "../status/_status";
// import { apiGetItems } from "../../functions/api";
import FixedTableCols from "../tables/_fixedTableCols";

const ResultTable = (props) => {
  const data = useResultsStore((state) => state.data);
  const setStore = useResultsStore((state) => state.setData);
  const setStoreData = (rawData) => setStore(rawData);

  // TODO - Use api
  useEffect(() => {
    //   async function fetchData() {
    //     fetch(
    //       "http://127.0.0.1:5500/src/mocks/results/_mockResults" +
    //         capitalize(props.itemType) +
    //         ".json"
    //     )
    //       .then((response) => response.json())
    //       .then((rawdata) => {
    //         setStoreData(rawdata);
    //       });
    //   }
    //   if (props.itemType) {
    //     fetchData();
    //   }

    //   const request = "results/_mockResults" + props.itemType + ".json";
    //   apiGetItems(request).then((r) => setStoreData(r));
    // }, [props.itemType]);

    // TODO - hacer otra llamada cuando se clicke en la cabecera
    const [selected, setSelected] = useState(false);
    const [fieldToSearchIn, setFieldToSearchIn] = useState("");
    const [itemsToPop, setItemsToPop] = useState("");
    const handleItemsToSearchChange = (item, field) => {
      setItemsToPop(item);
      setFieldToSearchIn(field);
    };

    // Gets the text related to each status value
    // const getStatusText = useResultsStore((state) => state.getStatusText);
    const handleOpenModal = (item) => {
      props.handleOpenModal(item);
      setSelected(true);
    };

    const handleDoubleClick = (item, e) => {
      if (e.detail == 2) {
        handleOpenModal(item);
      }
    };

    // ORDER
    const sortDataByFieldASC = useResultsStore(
      (state) => state.sortDataByFieldASC
    );
    const sortDataByFieldDES = useResultsStore(
      (state) => state.sortDataByFieldDES
    );
    const handleSortDataByFieldASC = (field) => {
      sortDataByFieldASC(field);
    };
    const handleSortDataByFieldDES = (field) => {
      sortDataByFieldDES(field);
    };

    return (
      <>
        <div
          className={
            props.fixedTableCols !== undefined
              ? "floating-cols-wrapper p-0"
              : "p-0"
          }
        >
          <div className="results--table col-12">
            <div className="results-table--wrapper">
              <ClayTable
                borderedColumns={false}
                borderless={true}
                striped={true}
                hover={true}
                className={"idispenser-table results-table"}
              >
                <ClayTable.Head key={"table-head"}>
                  <ClayTable.Row className={"selectable"}>
                    {data != undefined &&
                      Object.keys(data[0]).map((field) => {
                        if (field != "id") {
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
                            </ClayTable.Cell>
                          );
                        }
                      })}
                  </ClayTable.Row>
                </ClayTable.Head>
                <ClayTable.Body>
                  {data != undefined &&
                    data.map((item) => (
                      <ClayTable.Row
                        key={"table-body--" + item.id}
                        onClick={(e) => handleDoubleClick(item, e)}
                        className={
                          (fieldToSearchIn !== undefined &&
                            fieldToSearchIn !== "" &&
                            !item[fieldToSearchIn]
                              .toLowerCase()
                              .includes(itemsToPop.toLowerCase()) &&
                            "selectable-item dash") ||
                          (fieldToSearchIn !== undefined &&
                            fieldToSearchIn !== "" &&
                            item[fieldToSearchIn]
                              .toLowerCase()
                              .includes(itemsToPop.toLowerCase()) &&
                            "selectable-item pop ") +
                            (props.itemType == "error" &&
                              item["product id"] === "" &&
                              " err-product ") +
                            (props.itemType == "error" &&
                              item["sensor id"] === "" &&
                              " err-sensor ")
                        }
                      >
                        {Object.keys(item).map((field) => {
                          if (field != "id") {
                            return (
                              <ClayTable.Cell
                                key={
                                  "key--" +
                                  item.id +
                                  "-" +
                                  field +
                                  "-" +
                                  item[field]
                                }
                              >
                                {field === "comentario" ? (
                                  <>
                                    <CommentTooltip {...item} field={field} />
                                  </>
                                ) : field === "status" ? (
                                  <>
                                    {props.itemType == "hubs" ? (
                                      <>
                                        <StatusTooltip
                                          itemValue={item[field]}
                                        />
                                      </>
                                    ) : (
                                      <Status
                                        itemType={props.itemType}
                                        item={item}
                                        field={field}
                                      ></Status>
                                    )}
                                  </>
                                ) : (
                                  <span className="txt">{item[field]}</span>
                                )}
                              </ClayTable.Cell>
                            );
                          }
                        })}
                      </ClayTable.Row>
                    ))}
                </ClayTable.Body>
              </ClayTable>

              {/*************************
               * *************************
               * *
               * *
               * *
               * *
               * *
               * *
               * *
               * *
               */}
              {props.fixedTableCols !== undefined &&
                props.fixedTableCols[0] !== "" && (
                  <>
                    <FixedTableCols
                      data={data}
                      itemType={props.itemType}
                      fixedTableCols={props.fixedTableCols}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </>
    );
  });
};
export default ResultTable;
