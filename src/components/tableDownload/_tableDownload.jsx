import React from "react";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
import useResultsStore from "../../stores/resultsStore";

function TableDownload(props) {
  const data = useResultsStore((state) => state.data);

  const tableData = props.tableData || data;

  const downloadXLS = () => {
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout]), "data.xlsx");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <a
      onClick={exportToExcel}
      className="col-auto d-flex align-items-center mr-3"
    >
      <span className="py-3 pe-3 icon icon-download"></span>
      <span className="txt">Exportar</span>
    </a>
  );
}

export default TableDownload;
