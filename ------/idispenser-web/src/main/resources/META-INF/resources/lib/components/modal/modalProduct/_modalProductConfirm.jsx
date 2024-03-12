import React from "react";
import ClayModal, { useModal } from "@clayui/modal";
import ClayButton from "@clayui/button";
import { useEffect, useState } from "react";
import useModalProductStore from "../../../stores/modalProductStore";

const ModalProductConfirm = (props) => {
  const { observer, onOpenChange, open } = useModal();

  useEffect(() => {
    onOpenChange(props.openModal);
  }, [props.openModal]);

  const [confirmType, setConfirmType] = useState();
  const replaceBy = useModalProductStore((state) => state.replaceBy);

  return (
    <>
      {open && (
        <ClayModal observer={observer} size="md" center={true} status="info">
          {confirmType == "modify" && (
            /* TODO - A) comprobar datos logísticos */
            /* TODO - confirmar que está en clarity SÍ, SÍ + ACTIVAR EN CLARITY + CANCELAR */
            <>
              {replaceBy["datos logísticos"] == "" && (
                <>
                  <ClayModal.Body className="text-center pt-5 px-5">
                    <p>
                      Al guardar los cambios se modificarán los datos, ¿desea
                      continuar?
                    </p>
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
                          Sí
                        </ClayButton>
                        <ClayButton
                          displayType="secondary"
                          className="mx-3"
                          onClick={() => setConfirmType("modifyConfirm")}
                        >
                          Sí, activar en Clarity
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
              {(replaceBy.estado == "CAT" || replaceBy.estado == "CPT") && (
                <>
                  <ClayModal.Body className="text-center pt-5 px-5">
                    <p>
                      Al guardar los cambios se modificarán los datos, ¿desea
                      continuar?
                    </p>
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
              {(replaceBy.estado == "DES" ||
                replaceBy.estado == "OUT" ||
                replaceBy.estado == "") && (
                <>
                  <ClayModal.Body className="text-center pt-5 px-5">
                    <p>
                      El artículo seleccionado está inactivo en Clarity. ¿Desea
                      asignarlo al sensor?
                    </p>
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
            </>
          )}
          {confirmType == "delete" && (
            /* TODO - si tiene 2 o más sensores actualizar a null previo aviso de confirmación (revisar funcional) */
            <>
              {props.modalItem["sensor type"] == "PUSHER" ? (
                <>
                  <ClayModal.Body className="text-center pt-5 px-5">
                    <p>
                      Se dará de baja esta relación en NeoAlto. ¿Desea
                      continuar?
                    </p>
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
              ) : (
                <>
                  <ClayModal.Body className="text-center pt-5 px-5">
                    <p>
                      {props.modalItem.stock > 0 ? (
                        <>
                          El artículo tiene stock de{" "}
                          <span className="fw-bold primary">
                            {props.modalItem.stock}
                          </span>{" "}
                          unidades.
                        </>
                      ) : (
                        "Se eliminará el artículo de la BBDD. "
                      )}{" "}
                      ¿Desea continuar?
                    </p>
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
            Eliminar sensor/articulo
          </ClayButton>
        </div>
        <div className="col d-flex justify-content-end">
          <ClayButton
            displayType="secondary"
            onClick={() => {
              onOpenChange(true), setConfirmType("modify");
            }}
            disabled={replaceBy === ""}
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

export default ModalProductConfirm;
