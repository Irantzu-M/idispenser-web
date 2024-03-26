import React from "react";
import ClayTable from "@clayui/table";
import CommentTooltip from "../tooltips/_commentTooltip";
import Status from "../status/_status";

const IDispenserTableCell = (props) => {
  const item = props.item;
  const itemType = props.itemType;
  const field = props.field;

  return (
    <ClayTable.Cell key={"key--" + item.id + "-" + field + "-" + item[field]}>
      {/* <td key={"key--" + item.id + "-" + field + "-" + item[field]}> */}
      {field === "comentario" || field === "comments" ? (
        <>
          <CommentTooltip {...item} field={field} />
        </>
      ) : field === "status" ? (
        <Status item={props.item} itemType={itemType} field={field}></Status>
      ) : (
        <span className="txt">{item[field]}</span>
      )}
      {/* </td> */}
    </ClayTable.Cell>
  );
};
export default IDispenserTableCell;
