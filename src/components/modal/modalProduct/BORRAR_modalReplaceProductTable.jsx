import React from "react";
import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import { getStatusColor } from "../../../functions/functions";

const ReplaceTable = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.getData);
  }, [props.getData]);

  return (
    <>
      {data[0] && (
        <div className="modal--replacetable--wrapper">
          <ClayTable
            borderedColumns={false}
            borderless={true}
            striped={true}
            className="idispenser-table mt-3 mb-4"
          >
            <ClayTable.Head
              key={"modal--replacetable--head"}
              className={"modal--replacetable--head"}
            >
              <ClayTable.Row className={"selectable"}>
                <ClayTable.Cell
                  headingCell
                  className="tableheader--orderable"
                ></ClayTable.Cell>
                {Object.keys(data[0]).map((field) => {
                  if (
                    field != "id" &&
                    field != "estado" &&
                    field != "combinedField"
                  ) {
                    return (
                      <ClayTable.Cell
                        headingCell
                        className={
                          "tableheader--orderable " +
                          "modal--replacetable--head--" +
                          data[0].id +
                          "-" +
                          field
                        }
                        key={
                          "modal--replacetable--head--" +
                          data[0].id +
                          "-" +
                          field
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
                <SelectableSingleItemRow
                  estadoClass={
                    (item["estado"] == "DHT" || item["estado"] == "LAN") &&
                    " text-danger disabled"
                  }
                  key={"modal--replacetable--body--" + item.id}
                  {...item}
                >
                  {Object.keys(item).map((field) => {
                    if (
                      field != "id" &&
                      field != "estado" &&
                      field != "combinedField"
                    ) {
                      return (
                        <ClayTable.Cell
                          key={
                            "modal-replacetable--cell--" + item.id + "-" + field
                          }
                          className={
                            "modal-replacetable--cell--" + item.id + "-" + field
                          }
                        >
                          {field === "status" ? (
                            <span className="txt">
                              <span
                                className={
                                  "icon icon-circle err-type--" +
                                  (item["sensor type"] &&
                                  item["sensor id"] &&
                                  item["sensor position"]
                                    ? getStatusColor(item[field])
                                    : "2")
                                }
                              ></span>
                              {item["sensor type"] &&
                              item["sensor id"] &&
                              item["sensor position"] ? (
                                <>{item[field]}</>
                              ) : (
                                "Error de parametros"
                              )}
                            </span>
                          ) : (
                            <span className="txt">{item[field]}</span>
                          )}
                        </ClayTable.Cell>
                      );
                    }
                  })}
                </SelectableSingleItemRow>
              ))}
            </ClayTable.Body>
          </ClayTable>
        </div>
      )}
    </>
  );
};
export default ReplaceTable;
