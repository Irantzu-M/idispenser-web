import React from "react";
import ClayModal, { useModal } from "@clayui/modal";
import { useEffect, useState } from "react";
import ClayButton from "@clayui/button";
import ExcelUploader from "../excelUploader/_excelUploader";

const ModalImport = (props) => {
  const { observer, onOpenChange, open } = useModal();
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para indicar si se cargaron datos

  useEffect(() => {
    onOpenChange(props.openModal);
  }, [props.openModal]);

  const handleDataLoaded = (loaded) => {
    setDataLoaded(loaded); // Actualizar el estado cuando se cargan los datos
  };

  return (
    <>
      {open && (
        <ClayModal observer={observer} size="lg" status="info">
          <div className="modal--wrapper bg-lighter">
            <div className="modal--section px-5">
              <div className="modal--header d-flex justify-content-between align-items-center">
                <div className="modal--name">
                  <h4 className="modal--name--txt">Importación masiva</h4>
                </div>
                <div className="d-flex justify-content-end">
                  <ClayButton
                    aria-label="close"
                    className="close"
                    displayType="unstyled"
                    onClick={() => {
                      onOpenChange(false);
                      props.handleCloseModal();
                    }}
                  >
                    <span className="icon icon-close"></span>
                  </ClayButton>
                </div>
              </div>
            </div>
            <ClayModal.Body>
              <div className="modal--section mx-4">
                <ExcelUploader onDataLoaded={handleDataLoaded}></ExcelUploader>
              </div>
            </ClayModal.Body>
            <div className="modal-footer pt-5">
              <div className="col d-flex justify-content-end">
                {dataLoaded && ( // Mostrar el botón solo si se cargaron datos
                  <ClayButton
                    displayType="secondary"
                    onClick={() => {
                      onOpenChange(true), setConfirmType("modify");
                    }}
                  >
                    Aplicar
                  </ClayButton>
                )}
                <ClayButton
                  displayType="secondary"
                  className="btn-outline"
                  onClick={() => {
                    onOpenChange(false);
                    props.handleCloseModal();
                  }}
                >
                  Cancelar
                </ClayButton>
              </div>
            </div>
          </div>
        </ClayModal>
      )}
    </>
  );
};

export default ModalImport;
