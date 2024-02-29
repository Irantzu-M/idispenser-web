import React, { useState } from "react";
import ModalImport from "../modal/_modalImport";
import TableDownload from "../tableDownload/_tableDownload";

const ResultsActionbarButtons = (props) => {
  // MODAL
  const [openModal, setOpenModal] = useState(false);
  // const [item, setItem] = useState([]);
  const handleOpenModal = () => {
    console.log("handleopenmodal");
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="results--actionbar--buttons col-auto">
        <div className="row align-items-center">
          {/* <div className="btn-link col-auto d-flex align-items-center mr-3">
            <span className="py-3 pe-3 icon icon-arrows"></span>
            <span className="txt">Sustitución masiva</span>
          </div> */}
          <a
            // href="/modules/idispenser/src/main/resources/META-INF/resources/lib/components/results/templates/Sensores-Upload.xlsx"
            className="btn-link col-auto d-flex align-items-center mr-3"
            onClick={handleOpenModal}
          >
            <span className="py-3 pe-3 icon icon-download"></span>
            <span className="txt">Importación masiva</span>
          </a>
          <a className="btn-link col-auto d-flex align-items-center mr-3">
            <span className="py-3 pe-3 icon icon-edit"></span>
            <span className="txt">Template</span>
          </a>

          <TableDownload />
        </div>
      </div>

      <ModalImport
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        item={"item"}
        itemType={"itemTypeToFind"}
      ></ModalImport>
    </>
  );
};

export default ResultsActionbarButtons;
