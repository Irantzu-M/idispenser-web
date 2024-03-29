import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ModalSensorConfirm from "./_modalSensorConfirm";
import ClayTable from "@clayui/table";
import { capitalize } from "../../../functions/functions";
import DefaultTable from "../../tables/_defaultTable";
import ClayButton from "@clayui/button";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";
//--clayui import { ClaySelect } from "@clayui/form";

const ModalSensor = (props) => {
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
          capitalize(modalItemType) +
          props.item.id +
          ".json"
      )
        .then((response) => response.json())
        .then((itemData) => setModalItem(itemData[0]));
    }
    if (!modalItem[0]) {
      fetchModalItem();
    }
  }, [modalItem]);

  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    setSearchedText(text);
  };

  // TODO - Sensortype haccer referencial

  const sensorTypes = [
    { id: "pusher" },
    { id: "ustrasound" },
    { id: "weighing" },
    { id: "custody" },
  ];

  // TODO - Use api y que filtre cosas
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      fetch("http://127.0.0.1:5500/src/mocks/results/_mockResultsProducts.json")
        .then((response) => response.json())
        .then((rawdata) => {
          setProducts(rawdata);
        });
    }
    if (props.itemType) {
      fetchProducts();
    }
  }, [props.itemType]);

  return (
    <>
      <div className="modal--section borderless">
        <div className="d-flex justify-content-between align-items-center">
          <div className="modal--name ">
            <h4 className="modal--name--txt">
              <span className="icon icon-wrench"></span>Sensor Maintenance
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
        <div className="modal-body--name">Sensor data</div>
        <div className="modal--section px-3">
          <div className="">
            <div className="row mb-3">
              <div className="col-lg-4 mb-3">
                <span>Cliente: </span>
              </div>
              <div className="col-lg-8">
                <span>
                  {modalItem["customer id"] + " " + modalItem["customer"]}
                </span>
              </div>
              <div className="col-lg-4 mb-3">
                <span>Sensor ID: </span>
              </div>
              <div className="col-lg-8">
                <span>{modalItem["sensor id"]}</span>
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
              <div className="col-lg-4 mb-3">
                <span>HUB: </span>
              </div>
              <div className="col-lg-8">
                <span>{modalItem["hub"]}</span>
              </div>
            </div>
            <div className="">
              <div className="row">
                <div className="col-lg-4">
                  <span className="txt">Tipo de sensor: </span>
                </div>
                <div className="col-lg-8 mb-3">
                  <div className="select-wrapper">
                    {/* //--clayui  
                    <ClaySelect aria-label="Select Label" id="mySelectId">
                      {sensorTypes.map((item) => (
                        <ClaySelect.Option
                          key={item.id}
                          label={item.id}
                          value={item.id}
                        />
                      ))}
                    </ClaySelect>*/}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <span className="txt">Artículo: </span>
                </div>
                <div className="col-lg-8 mb-3">
                  {products[0] && (
                    <div className="select-wrapper">
                      <SearchSectionAutocomplete
                        options={products}
                        formControl={true}
                        handleChange={handleChange}
                        cellsToDisplay={["id", "product name"]}
                        placeholder={modalItem["warehouse id"]}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <span className="txt">Posición del sensor: </span>
                </div>
                <div className="col-lg-8 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="position"
                    defaultValue={modalItem["position"]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <span className="txt">Altura máx. sensor: </span>
                </div>
                <div className="col-lg-8 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="maxHeight"
                    defaultValue={modalItem["max height"]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <span
                    className="txt"
                    name="comments"
                    defaultValue={modalItem["comments"]}
                  >
                    Comentarios:{" "}
                  </span>
                </div>
                <div className="col-lg-8 mb-3">
                  <textarea className="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClayModal.Body>
      <ModalSensorConfirm
        modalItem={modalItem}
        handleCloseModal={props.handleCloseModal}
      />
    </>
  );
};
export default ModalSensor;
