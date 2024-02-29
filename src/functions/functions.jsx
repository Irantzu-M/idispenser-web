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
    case "OK":
      return "0";
    case "Error de conexión":
      return "1";
    case "Error de parámetros":
      return "2";
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

export {
  getKeyByValue,
  getHighlightedFormat,
  formatResult,
  convertArrayToObject,
  capitalize,
  getStatusColor,
  sortASC,
  sortDES,
};
