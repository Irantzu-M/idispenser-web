import React from "react";
import ClayTable from "@clayui/table";
import { useState } from "react";
import Status from "../status/_status";
import StatusTooltip from "../tooltips/_statusTooltip";
import { generateUniqueId } from "../../functions/functions";

const FixedTableCols = (props) => {
  const data = props.data;

  // TODO - hacer otra llamada cuando se clicke en la cabecera
  const [fieldToSearchIn, setFieldToSearchIn] = useState("");
  const [itemsToPop, setItemsToPop] = useState("");

  return (
    <div className="fixed-table-cols">
      <ClayTable
        borderedColumns={false}
        borderless={true}
        striped={true}
        hover={true}
        className={"idispenser-table results-table floating-col"}
      >
        <ClayTable.Head key={"table-head"}>
          <ClayTable.Row className={"selectable"}>
            {data[0] != undefined &&
              props.fixedTableCols.map((field) => {
                return (
                  <ClayTable.Cell
                    headingCell
                    className="tableheader--orderable text-uppercase"
                    key={
                      "key--" + data[0].id + "-" + field + "-" + data[0][field]
                    }
                  >
                    <span>
                      {field}
                      <span className="icon icon-chevron-down ml-2"></span>
                    </span>
                  </ClayTable.Cell>
                );
              })}
          </ClayTable.Row>
        </ClayTable.Head>

        <ClayTable.Body>
          {data != undefined &&
            data.map((item) => (
              <ClayTable.Row
                key={"table-body--" + generateUniqueId() + item.id}
                className={
                  (props.fieldToSearchIn != undefined &&
                    props.fieldToSearchIn != "" &&
                    !item[props.fieldToSearchIn]
                      .toLowerCase()
                      .includes(props.itemsToPop.toLowerCase()) &&
                    "selectable-item dash") ||
                  (props.fieldToSearchIn != undefined &&
                    itemsToPop != "" &&
                    props.fieldToSearchIn != "" &&
                    item[props.fieldToSearchIn]
                      .toLowerCase()
                      .includes(props.itemsToPop.toLowerCase()) &&
                    "selectable-item pop ") +
                    (props.itemType == "error" &&
                      item["product id"] === "" &&
                      " err-product ") +
                    (props.itemType == "error" &&
                      item["sensor id"] === "" &&
                      " err-sensor ")
                }
              >
                {props.fixedTableCols.map((field) => {
                  if (Object.keys(item).indexOf(field) >= 0) {
                    return (
                      <ClayTable.Cell
                        key={
                          "key--" + item.id + "-" + field + "-" + item[field]
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
                                <StatusTooltip itemValue={item[field]} />
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
                  } else {
                    return (
                      <ClayTable.Cell
                        key={
                          "key--" +
                          item.id +
                          "-" +
                          field +
                          "-" +
                          generateUniqueId()
                        }
                      ></ClayTable.Cell>
                    );
                  }
                })}
              </ClayTable.Row>
            ))}
        </ClayTable.Body>
      </ClayTable>
    </div>
  );
};
export default FixedTableCols;
