import React from "react";
import ClayModal, { useModal } from "@clayui/modal";
import ClayButton from "@clayui/button";
import { useEffect, useState } from "react";
import useModalProductStore from "../../../stores/modalProductStore";

const ModalHubConfirm = (props) => {
  const { observer, onOpenChange, open } = useModal();

  useEffect(() => {
    onOpenChange(props.openModal);
  }, [props.openModal]);

  const [confirmType, setConfirmType] = useState();
  const replaceBy = useModalProductStore((state) => state.replaceBy);

  const hasProducts = props.modalItem["product name"];

  return (
    <>
      {open && (
        <ClayModal observer={observer} size="md" center={true} status="info">
          {confirmType == "modify" && (
            <>
              <ClayModal.Body className="text-center pt-5 px-5">
                <p>¿Desea modificar los datos del HUB?</p>
              </ClayModal.Body>
              <ClayModal.Footer
                className="justify-content-center  pb-5"
                last={
                  <ClayButton.Group spaced>
                    <ClayButton
                      displayType="secondary"
                      className="mx-3"
                      onClick={() => setConfirmType("modifyConfirm")}
                    >
                      Continuar
                    </ClayButton>
                    <ClayButton
                      displayType="secondary"
                      className="btn-outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </ClayButton>
                  </ClayButton.Group>
                }
              />
            </>
          )}
          {confirmType == "delete" && (
            <>
              <ClayModal.Body className="text-center pt-5 px-5">
                {hasProducts != "" ? (
                  <p>
                    El HUB tiene sensores asignados. Desea borrar
                    definitivamente el HUB, sensor y artículos en iDispenser y
                    deshabilitar el artículo en clarity?
                  </p>
                ) : (
                  <p>¿Está seguro de que desea eliminar el HUB?</p>
                )}
              </ClayModal.Body>
              <ClayModal.Footer
                className="justify-content-center  pb-5"
                last={
                  <ClayButton.Group spaced>
                    <ClayButton
                      displayType="secondary"
                      className="mx-3"
                      onClick={() => setConfirmType("deleteConfirm")}
                    >
                      Continuar
                    </ClayButton>
                    <ClayButton
                      displayType="secondary"
                      className="btn-outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </ClayButton>
                  </ClayButton.Group>
                }
              />
            </>
          )}

          {confirmType == "modifyConfirm" && (
            <>
              <ClayModal.Body className="text-center pt-5 px-5">
                <span className="icon icon-check-circle icon-lg d-block mb-4"></span>
                <p>¡Los cambios se han guardado correctamente!</p>
              </ClayModal.Body>
              <ClayModal.Footer className="justify-content-center  pb-5" />
            </>
          )}
          {confirmType == "deleteConfirm" && (
            <>
              <ClayModal.Body className="text-center pt-5 px-5">
                <span className="icon icon-check-circle icon-lg d-block mb-4"></span>
                <p>¡El artículo/sensor se ha dado de baja correctamente!</p>
              </ClayModal.Body>
              <ClayModal.Footer className="justify-content-center  pb-5" />
            </>
          )}
          {confirmType == "cancel" && (
            <>
              <ClayModal.Body className="text-center pt-5 px-5">
                <p>¿Está seguro de que desea cancelar la operación?</p>
              </ClayModal.Body>
              <ClayModal.Footer
                className="justify-content-center  pb-5"
                last={
                  <ClayButton.Group spaced>
                    <ClayButton
                      displayType="secondary"
                      className="mx-3"
                      onClick={props.handleCloseModal}
                    >
                      Continuar
                    </ClayButton>
                    <ClayButton
                      displayType="secondary"
                      className="btn-outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </ClayButton>
                  </ClayButton.Group>
                }
              />
            </>
          )}
        </ClayModal>
      )}
      <div className="modal-footer d-flex justify-content-between">
        <div className="col">
          <ClayButton
            className="btn-outline"
            displayType="secondary"
            onClick={() => {
              onOpenChange(true);
              setConfirmType("delete");
            }}
          >
            Eliminar HUB
          </ClayButton>
        </div>
        <div className="col d-flex justify-content-end">
          <ClayButton
            displayType="secondary"
            onClick={() => {
              onOpenChange(true), setConfirmType("modify");
            }}
          >
            Modificar datos
          </ClayButton>
          <ClayButton
            displayType="secondary"
            className="btn-outline"
            onClick={() => {
              onOpenChange(true), setConfirmType("cancel");
            }}
          >
            Cancelar
          </ClayButton>
        </div>
      </div>
    </>
  );
};

export default ModalHubConfirm;
