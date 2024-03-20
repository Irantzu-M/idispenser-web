import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ModalSensorConfirm from "./_modalSensorConfirm";
import ClayTable from "@clayui/table";
import { capitalize } from "../../../functions/functions";
import DefaultTable from "../../tables/_defaultTable";
import ClayButton from "@clayui/button";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";
import useFilterStore from "../../../stores/filtersStore";
import { ClaySelect } from "@clayui/form";
import useResultsStore from "../../../stores/resultsStore";
import { fetchApi } from "../../../api/idispenserApi";

const ModalSensor = (props) => {
  const modalItemType = props.itemType;
  const sensorTypes = useFilterStore((state) =>
    state.filters.filter((option) => {
      if (option.name == "sensortype") {
        return option;
      }
    })
  );

  const modalItem = props.item;
  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    setSearchedText(text);
  };

  // LLAMADA A API para Artículos
  const [products, setProducts] = useState([{}]);
  let endpoint = "articulos";
  const fetchFilterData = useResultsStore((state) => state.fetchFilterData);

  useEffect(() => {
    if (searchedText.length >= 6) {
      endpoint = `articulos` + `?search=${searchedText}`;

      let resultData;
      try {
        fetchApi(endpoint).then((data) => setProducts(data["items"]));
      } catch (error) {
        throw error;
      }
    }
  }, [searchedText]);

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
                  // TODO - necesito el cientenombre pero no lo recibo de la api
                  {modalItem.idSensor + " " /*+ modalItem.clienteNombre*/}
                </span>
              </div>
              <div className="col-lg-4 mb-3">
                <span>Sensor ID: </span>
              </div>
              <div className="col-lg-8">
                <span>{modalItem.idSensor}</span>
              </div>
              <div className="col-lg-4 mb-3">
                <span>Almacén: </span>
              </div>
              <div className="col-lg-8">
                <span>
                  {modalItem.idAlmacenQuirofano + " " + modalItem.almacenName}
                </span>
              </div>
              <div className="col-lg-4 mb-3">
                <span>HUB: </span>
              </div>
              <div className="col-lg-8">
                <span>{modalItem.idConcentrador}</span>
              </div>
            </div>
            <div className="">
              <div className="row">
                <div className="col-lg-4">
                  <span className="txt">Tipo de sensor: </span>
                </div>
                <div className="col-lg-8 mb-3">
                  <div className="select-wrapper">
                    <ClaySelect aria-label="Select Label" id="mySelectId">
                      {sensorTypes.map((item) => (
                        <ClaySelect.Option
                          key={item.idS}
                          label={item.id}
                          value={item.id}
                        />
                      ))}
                    </ClaySelect>
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
                    defaultValue={modalItem.sensorPosition}
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
                    defaultValue={modalItem.maxHeight}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <span
                    className="txt"
                    name="comments"
                    defaultValue={modalItem.comments}
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
