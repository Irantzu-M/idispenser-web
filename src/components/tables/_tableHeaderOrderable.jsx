import React, { useState } from "react";
import DropDown from "@clayui/drop-down";
import {
  formatResult,
  generateUniqueId,
  getStatusColor,
} from "../../functions/functions";

const TableHeaderOrderable = (props) => {
  const data = props.data;
  const selectedItem = props.selected;
  const setSelectedItem = props.setSelected;

  const handleSortDataByFieldASC = props.handleSortDataByFieldASC;
  const handleSortDataByFieldDES = props.handleSortDataByFieldDES;

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    // if (event.target.value.length >= 3) {
    //   props.change(event.target.value, props.field);
    // }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleChange(event);
    }
  };

  const handleSelect = (item) => {
    setValue(item[props.field]);
    props.change(item[props.field], props.field);
    setSelectedItem(item);
  };

  const handleRemove = () => {
    setValue("");
    props.change("", props.field);
    setSelectedItem(false);
  };

  const handleBlur = () => {
    //setValue("");
  };

  return (
    <>
      <DropDown
        className="tableheader--orderable--dropdown"
        onBlur={handleBlur}
        trigger={
          <span>
            {props.children}
            <span className="icon icon-chevron-down ml-2"></span>
          </span>
        }
      >
        <div className="tableheader--orderable--menu">
          <div
            className="tableheader--orderable--item"
            onClick={() => handleSortDataByFieldASC(props.field)}
          >
            <span className="icon icon-arrow-down"></span>
            <span className="txt">Orden ascendente</span>
          </div>
          <div
            className="tableheader--orderable--item"
            onClick={() => handleSortDataByFieldDES(props.field)}
          >
            <span className="icon icon-arrow-up"></span>
            <span className="txt">Orden descendente</span>
          </div>
          <div className="tableheader--orderable--item search-item">
            <span className="icon icon-search" onClick={handleChange}></span>
            <input
              type="text"
              className="tableheader--orderable--search d-inline-block"
              placeholder="Type to filter"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          {(selectedItem != false || value >= 3) && (
            <div className="tableheader--orderable--selected px-3">
              <span
                className="btn btn-secondary btn-sm"
                onClick={() => handleRemove()}
              >
                <span className="txt pr-1">
                  {selectedItem != false ? selectedItem[props.field] : value}
                </span>
                <span className="icon icon-close"></span>
              </span>
            </div>
          )}
          {value && (
            <DropDown.ItemList items={data}>
              {data.map((item) => {
                if (
                  item[props.field]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                ) {
                  return (
                    <DropDown.Item
                      key={generateUniqueId()}
                      onClick={() => handleSelect(item)}
                    >
                      {props.field === "status" ? (
                        <>
                          <span
                            className={
                              "icon icon-circle err-type--" +
                              getStatusColor(item[props.field])
                            }
                          ></span>
                          <span className="txt">{item[props.field]}</span>
                        </>
                      ) : (
                        <span>{formatResult(item, value, [props.field])}</span>
                      )}
                    </DropDown.Item>
                  );
                }
                return null;
              })}
            </DropDown.ItemList>
          )}
        </div>
      </DropDown>
    </>
  );
};

export default TableHeaderOrderable;
