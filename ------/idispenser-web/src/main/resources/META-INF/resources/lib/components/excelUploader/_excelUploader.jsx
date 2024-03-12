import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import DefaultTable from "../tables/_defaultTable";

const ExcelUploader = ({ onDataLoaded }) => {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [newData, setNewData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tableData) {
      const headers = tableData[0];
      const jsonData = tableData.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
      setNewData(jsonData);
      onDataLoaded && onDataLoaded(true); // Notificar al padre que se cargaron datos
    } else {
      onDataLoaded && onDataLoaded(false); // Notificar al padre que no hay datos
    }
  }, [tableData, onDataLoaded]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (
        uploadedFile.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        uploadedFile.type !== "text/csv" &&
        uploadedFile.type !== "application/vnd.ms-excel"
      ) {
        setError(
          "Se ha producido un error al subir el archivo, inténtelo de nuevo. El archivo debe ser CSV, XLS o XLSX."
        );
        setTableData(null);
        return;
      }

      if (jsonData.length === 0) {
        const csvData = XLSX.utils.sheet_to_csv(worksheet);
        const rows = csvData.split(/\r\n|\n/).map((row) => row.split(","));
        setTableData(rows);
      } else {
        setTableData(jsonData);
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleDeleteFile = () => {
    setFile(null);
    setTableData(null);
    setNewData(null);
    setError("");
    const input = document.getElementById("fileInput");
    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="uploader">
      <form className="uploader--form mb-4">
        {!error && file && (
          <div className="uploader--filebox">
            <div className="uploader--filename">
              Archivo seleccionado: {file.name}
            </div>
            <a
              className="uploader--fileremove"
              href="#"
              onClick={handleDeleteFile}
            >
              <span className="icon icon-close"></span>
            </a>
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          accept=".xlsx,.xls,.csv"
        />
        {error && <div className="uploader--error">{error}</div>}
      </form>
      {newData && <DefaultTable stripped data={newData}></DefaultTable>}
    </div>
  );
};

export default ExcelUploader;
