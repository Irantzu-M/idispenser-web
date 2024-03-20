import React from "react";
const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
// HIGHLIGHT PRESSED LETTERS
const getHighlightedFormat = (label, userInput) => {
  return label?.split("-").map((word) =>
    word.split("").map((c, i) =>
      userInput.toLowerCase().includes(c.toLowerCase()) ? (
        <span className="fw-bold" key={"hightlight-" + i}>
          {c}
        </span>
      ) : (
        c
      )
    )
  );
};
const formatResult = (item, searchText, fields) => {
  const userInput = searchText;
  const label = fields.map((field) => item[field] + " ").toString() || "";
  return (
    <>
      {userInput?.length
        ? label?.split(" ").length
          ? getHighlightedFormat(label, userInput)
          : label
        : label}
    </>
  );
};
const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const getStatusColor = (status) => {
  switch (status) {
    case "ERROR 0 - Concentrador sin cliente asignado":
      return "0";
    case "ERROR 1 - Conexion Sensor":
      return "1";
    case "ERROR 2 - Concentrador en almacén desactivado":
      return "2";
    case "ERROR 3 - Concentrador sin sensores asignados":
      return "3";
    case "ERROR 4 - Conexion concentrador":
      return "4";
    case "Error de parámetros":
      return "5";
    case "OK":
      return "6";
    default:
      return "9";
  }
};

const sortASC = (initialData, field) => {
  const dataCopy = [...initialData];
  return dataCopy.sort((itemA, itemB) => {
    if (typeof itemA[field] == "number") {
      return itemA[field] - itemB[field];
    } else {
      return itemA[field]?.localeCompare(itemB[field]);
    }
  });
};
const sortDES = (initialData, field) => {
  const dataCopy = [...initialData];
  return dataCopy.sort((itemA, itemB) => {
    if (typeof itemB[field] == "number") {
      return itemB[field] - itemA[field];
    } else {
      return itemB[field]?.localeCompare(itemA[field]);
    }
  });
};
function generateUniqueId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export {
  getKeyByValue,
  getHighlightedFormat,
  formatResult,
  convertArrayToObject,
  capitalize,
  getStatusColor,
  sortASC,
  sortDES,
  generateUniqueId,
};
