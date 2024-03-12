import React from "react";
import { getStatusColor } from "../../functions/functions";
// TODO - Asegurarme de que son estos los campos y la lógica sea:
// si no hay ID ni NAME ni CUSTOMER product ID no hay producto
// si no hay SNESOR TYPE, SENSOR ID o SENSOR POSITION no hay sensor
// TODO - cómo sé que el sensor está inactivo para decir que hay error de sensor?
const Status = (props) => {
  const item = props.item;
  const field = props.field;
  const statusColor = () => {
    if (
      props.itemType == "product" &&
      (!item["sensor type"] || !item["sensor id"] || !item["sensor position"])
    ) {
      return "2";
    } else if (
      props.itemType == "error" &&
      (!item["product id"] ||
        !item["product name"] ||
        !item["customer product id"])
    ) {
      return "3";
    } else if (props.itemType == "huberror" && !item["customer"]) {
      return "2";
    } else if (
      props.itemType == "huberror" &&
      item["status"].toLowerCase().includes("error")
    ) {
      return "1";
    } else if (
      !item["sensor type"] ||
      !item["sensor id"] ||
      !item["sensor position"]
    ) {
      return "2";
    } else {
      return getStatusColor(item[field]);
    }
  };
  const statusField = () => {
    if (
      props.itemType == "product" &&
      (!item["sensor type"] || !item["sensor id"] || !item["sensor position"])
    ) {
      return "Artículo sin sensor";
    } else if (
      props.itemType == "error" &&
      (!item["product id"] ||
        !item["product name"] ||
        !item["customer product id"])
    ) {
      return "Sensor sin artículo";
    } else if (props.itemType == "huberror" && !item["customer"]) {
      return "No hay cliente asignado";
    } else if (
      props.itemType == "huberror" &&
      item["status"].toLowerCase().includes("error")
    ) {
      return item[field];
    } else {
      return item[field];
    }
  };
  return (
    <span className="txt">
      <span className={"icon icon-circle err-type--" + statusColor()}></span>
      {statusField()}
    </span>
  );
};
export default Status;
