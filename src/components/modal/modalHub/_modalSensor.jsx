import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ClayButton from "@clayui/button";
import { ClaySelect } from "@clayui/form";
import { fetchApi } from "../../../api/idispenserApi";
import { generateUniqueId } from "../../../functions/functions";
import useFilterStore from "../../../stores/filtersStore";
import useResultsStore from "../../../stores/resultsStore";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";
import ModalSensorConfirm from "./_modalSensorConfirm";

const ModalSensor = (props) => {
  // const modalItemType = props.itemType;
  // const sensorTypes = useFilterStore((state) =>
  //   state.filters.filter((option) => {
  //     if (option.name == "sensortype") {
  //       return option;
  //     }
  //   })
  // );
  // TODO - Intentar ponerlo desde el useFilterStore
  const sensorTypes = [
    { id: "PUSHERS", label: "pusher", selected: false },
    { id: "ULTRASOUND", label: "ustrasound", selected: false },
    { id: "WEIGHING", label: "weighing", selected: false },
    { id: "CUSTODY", label: "custody", selected: false },
  ];

  const modalItem = props.item;

  // Artículos
  // TEXTO DE BÚSQUEDA
  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    if (text != "" && text != undefined) {
      setSearchedText(text);
    }
  };

  // LLAMADA A API para Artículos
  const [products, setProducts] = useState([{}]);
  let endpoint = "articulos";
  // const fetchFilterData = useResultsStore((state) => state.fetchFilterData);

  useEffect(() => {
    if (searchedText.length >= 6) {
      const fetchData = async (endpoint) => {
        try {
          const response = await fetchApi(endpoint);
          const rawData = await response["items"];

          if (rawData[0]) {
            console.log("rawData", rawData);
            setProducts(remap(rawData));
          }
          //return rawData;
        } catch (error) {
          throw error;
        }

        function remap(dataToRemap) {
          const rmd = dataToRemap.map((item) => {
            const id = item.idArticulo;
            return { ...item, id };
          });
          return rmd;
        }
      };

      const endpoint = `articulos?search=${searchedText}`;
      fetchData(endpoint);
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
                  {/* TODO - necesito el clientenombre pero no lo recibo de la api */}
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
                          key={generateUniqueId()}
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
                  {/* <div className="select-wrapper"> */}
                  <SearchSectionAutocomplete
                    options={products}
                    formControl={true}
                    handleChange={handleChange}
                    placeholder={modalItem.idArticulo}
                  />
                  {/* </div> */}
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
                  <span className="txt">Comentarios: </span>
                </div>
                <div className="col-lg-8 mb-3">
                  <textarea
                    className="form-control"
                    name="comments"
                    defaultValue={modalItem.comments}
                  ></textarea>
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
