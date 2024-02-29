import React from "react";

const StatusTooltip = (props) => {
  // TODO - recoger los errores cuando conectemos con API
  return (
    <>
      {props.itemValue == "OK" && (
        <>
          <span className="status-tooltip status-tooltip success">
            <span className="icon icon-check"></span>{" "}
            <span className="txt">{props.itemValue}</span>
            <span className="status-tooltip--message">
              <span className="icon icon-check"></span>
              <span className="txt">OK</span>
            </span>
          </span>
        </>
      )}
      {props.itemValue == "Error - connection" && (
        <>
          <span className="status-tooltip danger">
            <span className="icon icon-close"></span>{" "}
            <span className="txt">{props.itemValue}</span>
            <span className="status-tooltip--message">
              <span className="icon icon-close"></span>
              <span className="txt">2 errores de conexión 000</span>
            </span>
          </span>
        </>
      )}
      {props.itemValue == "Error - parameter" && (
        <>
          <span className="status-tooltip warning">
            <span className="icon icon-exclamation"></span>{" "}
            <span className="txt">{props.itemValue}</span>
            <span className="status-tooltip--message">
              <span className="icon icon-exclamation"></span>
              <span className="txt">1 error de parametrización</span>
            </span>
          </span>
        </>
      )}
    </>
  );
};

export default StatusTooltip;
