import React, { useState } from "react";
// import useResultsStore from "../../stores/resultsStore";
import DropDown from "@clayui/drop-down";
import { formatResult, getStatusColor } from "../../functions/functions";

const TableHeaderOrderable = (props) => {
  const data = props.data; // useResultsStore((state) => state.data);

  const handleSortDataByFieldASC = props.handleSortDataByFieldASC;
  const handleSortDataByFieldDES = props.handleSortDataByFieldDES;

  const [value, setValue] = useState("");
  const minimunChars = 1;
  const handleChange = (searchText) => {
    setValue(searchText);
    if (searchText.length >= minimunChars) {
      props.change(searchText, props.field);
    }
  };

  const handleSearch = (searchText) => {
    setValue(searchText);
    if (searchText.length >= minimunChars) {
      props.change(searchText, props.field);
    }
  };

  // Gets the text related to each status value
  // const getStatusText = useResultsStore((state) => state.getStatusText);
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
            <DropDown.Search
              className="tableheader--orderable--search d-inline-block"
              placeholder="Type to filter"
              defaultValue=""
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
                    .includes(value.toString().toLowerCase())
                ) {
                  return (
                    <DropDown.Item
                      key={item[props.field] + "-" + item.id}
                      onClick={() => handleSearch(item[props.field])}
                    >
                      {
                        // TODO - revisar que tenemos que hacer este proceso para el STATUS o viene directamente el texto, en este y en otros tsx
                        props.field == "status" ? (
                          <>
                            <span className="txt">
                              <span
                                className={
                                  "icon icon-circle err-type--" +
                                  getStatusColor(item[props.field])
                                }
                              ></span>
                              {item[props.field]}
                            </span>
                          </>
                        ) : (
                          <span>
                            {formatResult(item, value, [props.field])}
                          </span>
                        )
                      }
                    </DropDown.Item>
                  );
                }
              })}
            </DropDown.ItemList>
          )}
        </div>
      </DropDown>
    </>
  );
};
export default TableHeaderOrderable;
