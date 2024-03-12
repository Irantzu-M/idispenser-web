import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ModalErrorConfirm from "./_modalErrorConfirm";
import ClayTable from "@clayui/table";
import { capitalize } from "../../../functions/functions";
import DefaultTable from "../../tables/_defaultTable";
import ClayButton from "@clayui/button";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";
//--clayuiform import { ClaySelect } from "@clayui/form";

const ModalErrorSensor = (props) => {
  const modalItemType = props.itemType;
  // CAMPOS A MOSTRAR - código de artículo y descripción.
  // const fieldsToSearchIn = ["reference", "label"];

  // TODO - Use api
  const [modalItem, setModalItem] = useState([]);
  //const [replaceItem, setReplaceItem] = useState([]);
  useEffect(() => {
    async function fetchModalItem() {
      fetch(
        "http://127.0.0.1:5500/src/mocks/modals/_mockModal" +
          // TODO - recuperar esto
          // capitalize(modalItemType) +
          // props.item.id +
          "Error111111" +
          ".json"
      )
        .then((response) => response.json())
        .then((itemData) => setModalItem(itemData[0]));
    }
    if (!modalItem[0]) {
      fetchModalItem();
    }
  }, [modalItem]);

  return (
    <>
      <div className="modal--section borderless">
        <div className="d-flex justify-content-between align-items-center">
          <div className="modal--name ">
            <h4 className="modal--name--txt">
              <span className="icon icon-wrench"></span>Sensores disponibles
            </h4>
          </div>
          <div className="d-flex justify-content-end">
            <ClayButton
              aria-label="close"
              className="close"
              displayType="unstyled"
              onClick={() => {
                props.onOpenChange(false);
                props.handleCloseModal();
              }}
            >
              <span className="icon icon-close"></span>
            </ClayButton>
          </div>
        </div>
      </div>
      <ClayModal.Body className="border my-4">
        <div className="modal-body--name">
          Artículo{" "}
          <strong>
            {modalItem["customer id"] + " " + modalItem["customer name"]}
          </strong>
        </div>
        <div className="modal--section px-3">
          <div className="">
            <div className="row mb-3 pt-3">
              <div className="col-lg-4 mb-3">
                <span>Cliente: </span>
              </div>
              <div className="col-lg-8">
                <span>
                  {modalItem["customer id"] + " " + modalItem["customer name"]}
                </span>
              </div>
              <div className="col-lg-4 mb-3">
                <span>Almacén: </span>
              </div>
              <div className="col-lg-8">
                <span>
                  {modalItem["warehouse id"] +
                    " " +
                    modalItem["warehouse name"]}
                </span>
              </div>
            </div>
            <div className="">
              <div className="row">
                <div className="mt-4">
                  <p>Selecciona el nuevo sensor según su posición: </p>
                </div>
              </div>
              <DefaultTable
                stripped
                multiselect
                handleSelect={() => {}}
                tableQuery={
                  "modals/_mockModalErrorSensor" +
                  /*capitalize(itemTypeToFind) +*/ ".json"
                }
                customHeader=" "
                itemType={""}
                className="bg-lighter"
              ></DefaultTable>
            </div>
          </div>
        </div>
      </ClayModal.Body>
      <ModalErrorConfirm
        modalItem={modalItem}
        handleCloseModal={props.handleCloseModal}
      />
    </>
  );
};
export default ModalErrorSensor;
