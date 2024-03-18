import React, { useState } from "react";
import DropDown from "@clayui/drop-down";
import { formatResult, getStatusColor } from "../../functions/functions";

const TableHeaderOrderable = (props) => {
  const data = props.data;

  const handleSortDataByFieldASC = props.handleSortDataByFieldASC;
  const handleSortDataByFieldDES = props.handleSortDataByFieldDES;

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.length >= 1) {
      props.change(event.target.value, props.field);
    }
  };

  const handleSearch = (searchText) => {
    setValue(searchText);
    if (searchText.length >= 1) {
      props.change(searchText, props.field);
    }
  };

  const handleBlur = () => {
    setValue("");
  };

  return (
    <>
      <DropDown
        className="tableheader--orderable--dropdown"
        onBlur={handleBlur}
        trigger={
          <span>
            {props.children}
            <span className="icon icon-chevron-down ms-2"></span>
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
          <div className="tableheader--orderable--item">
            <span className="icon icon-search"></span>
            <input
              type="text"
              className="tableheader--orderable--search d-inline-block"
              placeholder="Type to filter"
              value={value}
              onChange={handleChange}
            />
          </div>
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
                      key={item[props.field] + "-" + item.id}
                      onClick={() => handleSearch(item[props.field])}
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
