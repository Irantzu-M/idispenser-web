import React from "react";
import ClayModal, { useModal } from "@clayui/modal";
import { useEffect } from "react";
import ModalProduct from "./modalProduct/_modalProduct";
import ModalHub from "./modalHub/_modalHub";
import ModalSensor from "./modalSensor/_modalSensor";
import ModalErrorSensor from "./modalError/_modalErrorSensor";
import ModalErrorProduct from "./modalError/_modalErrorProduct";
import ModalHuberror from "./modalError/_modalHuberror";

const ModalEdit = (props) => {
  const { observer, onOpenChange, open } = useModal();

  useEffect(() => {
    onOpenChange(props.openModal);
  }, [props.openModal]);

  return (
    <>
      {open && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
          className={
            props.itemType == "sensors" ||
            props.itemType == "error" ||
            props.itemType == "huberror"
              ? "modal-lg-md"
              : ""
          }
        >
          <div className="modal--wrapper bg-lighter">
            {props.itemType == "products" && (
              <ModalProduct {...props} onOpenChange={onOpenChange} />
            )}
            {props.itemType == "hubs" && (
              <ModalHub {...props} onOpenChange={onOpenChange} />
            )}
            {props.itemType == "sensors" && (
              <ModalSensor {...props} onOpenChange={onOpenChange} />
            )}
            {props.itemType == "error" &&
              (props.item["sensor id"] === "" ? (
                <ModalErrorSensor {...props} onOpenChange={onOpenChange} />
              ) : (
                <ModalErrorProduct {...props} onOpenChange={onOpenChange} />
              ))}
            {props.itemType == "huberror" && (
              <ModalHub {...props} onOpenChange={onOpenChange} />
            )}
          </div>
        </ClayModal>
      )}
    </>
  );
};

export default ModalEdit;
