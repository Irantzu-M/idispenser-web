import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ModalProductConfirm from "./_modalProductConfirm";
import ClayButton from "@clayui/button";
import ClayTable from "@clayui/table";
import ClayTableRow from "@clayui/table/lib/Row";
import ClayTableCell from "@clayui/table/lib/Cell";
// import ReplaceTable from "./_modalReplaceProductTable";
// import SensorSelectTable from "./_modalSensorSelectTable";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";
// import { capitalize } from "../../../functions/functions";
import DefaultTable from "../../tables/_defaultTable";

const ModalProduct = (props) => {
  const modalItemType = props.itemType;
  const modalItem = props.item;

  // CAMPOS A MOSTRAR - código de artículo y descripción.
  // const fieldsToSearchIn = ["Código de artículo", "Descripción "];
  // const fieldsToDisplay = ["Código de artículo", "Descripción "];

  // ---------------------- CLIENTES
  // TEXTO DE BÚSQUEDA
  const [clientSearchedText, setClientSearchedText] = useState("");
  const handleClientChange = (text) => {
    if (text != "" && text != undefined) {
      setClientSearchedText(text);
    }
  };

  // LLAMADA A API para SENSORES
  const [sensors, setSensors] = useState([{}]);
  sensorFieldsToDisplay = [
    "idConcentrador",
    "idArticulo",
    "idSensor",
    "sensorPosition",
    "comments",
  ];
  useEffect(() => {
    const fetchData = async (sensorsEndpoint) => {
      try {
        const response = await fetchApi(sensorsEndpoint);
        const rawData = await response["items"];

        if (rawData[0]) {
          setSensors(remap(rawData));
        }
        //return rawData;
      } catch (error) {
        throw error;
      }

      function remap(dataToRemap) {
        const rmd = dataToRemap.map((item) => {
          const id = item.idSensor;
          return { ...item, id };
        });
        return rmd;
      }
    };

    {
      /* TODO - asegurarme de que este endpoint va a dar los resultados del HUB y no de otros hubs también */
    }
    const sensorsEndpoint = `sensors/list?concentradorIds=${modalItem.idConcentrador}`;
    fetchData(sensorsEndpoint);
  }, []);
  // ---------------------- fin SENSORES

  return (
    <>
      <div className="modal--section px-5">
        <div className="modal--header d-flex justify-content-between align-items-center">
          <div className="modal--name">
            <h4 className="modal--name--txt">
              Modificar borrar artículo / sensor
              {modalItem.idArticulo}
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
      <ClayModal.Body>
        <div className="modal--section px-4">
          <div className="row">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-12">
                  <ClayTable
                    borderedColumns={false}
                    borderless={true}
                    hover={false}
                    className="table-borderless"
                  >
                    <ClayTable.Body>
                      <ClayTable.Row>
                        <ClayTable.Cell>
                          <span>Cliente: </span>
                        </ClayTable.Cell>
                        <ClayTable.Cell className="fw-bold">
                          <span>
                            {modalItem.idCliente + " " + modalItem.clienteName}
                          </span>
                        </ClayTable.Cell>
                      </ClayTable.Row>
                      <ClayTable.Row>
                        <ClayTable.Cell>
                          <span>Almacén: </span>
                        </ClayTable.Cell>
                        <ClayTable.Cell className="fw-bold">
                          <span>
                            {modalItem["warehouse id"] +
                              " " +
                              modalItem["warehouse name"]}
                          </span>
                        </ClayTable.Cell>
                      </ClayTable.Row>
                      <ClayTable.Row>
                        <ClayTable.Cell>
                          <span>HUB ID: </span>
                        </ClayTable.Cell>
                        <ClayTable.Cell className="fw-bold">
                          <span>{modalItem["hubid"]}</span>
                        </ClayTable.Cell>
                      </ClayTable.Row>
                    </ClayTable.Body>
                  </ClayTable>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-lg-3">Sensor ID y ubicación:</div>
                    <div className="col-lg-9">
                      {/* <SensorSelectTable /> */}
                      <DefaultTable
                        multiselect
                        fieldsToDisplay={sensorFieldsToDisplay}
                        data={sensors}
                      ></DefaultTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 modal--datatable-wrapper">
              <ClayTable
                borderedColumns={false}
                borderless={true}
                hover={false}
                className="table-borderless"
              >
                <ClayTable.Body>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Posición:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["sensor position"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Datos logísticos:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["datos logísticos"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Ubicación artículo:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["ubicación"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Stock:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["stock"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Última actualización stock:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["última actualización stock"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Última actualización artículo:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["última actualización artículo"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Nº Etiqueta Farmaconnect:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>{modalItem["etiqueta farmaconnect"]}</span>
                    </ClayTableCell>
                  </ClayTableRow>
                  <ClayTableRow>
                    <ClayTableCell>
                      <span>Estado / fecha actualización Farmaconnect:</span>
                    </ClayTableCell>
                    <ClayTableCell className="fw-bold">
                      <span>
                        {modalItem["última actualización farmaconnect"]}
                      </span>
                    </ClayTableCell>
                  </ClayTableRow>
                </ClayTable.Body>
              </ClayTable>
            </div>
          </div>
        </div>

        <div className="modal--section pt-5">
          <div className="row">
            {remapData[0] && (
              <SearchSectionAutocomplete
                options={remapData}
                handleChange={handleChange}
                cellstoSearchIn={fieldsToSearchIn}
                cellsToDisplay={fieldsToDisplay}
                placeholder="Search by code or desciption"
              ></SearchSectionAutocomplete>
            )}
            {remapData[0] && searchedText.length >= 6 && (
              <>
                {/* <ReplaceTable
                  className="mt-4"
                  getData={itemsFound}
                ></ReplaceTable> */}
                <DefaultTable
                  striped
                  select
                  // TODO - Acción al seleccionar
                  //handleSelect={handleSelect}
                  selectedItems={itemsFound}
                  tableQuery={
                    "filters/_mockProductstores" +
                    /*capitalize(itemTypeToFind) +*/ ".json"
                  }
                  // itemType={"store"}
                  className="bg-lighter"
                ></DefaultTable>
              </>
            )}
          </div>
        </div>
      </ClayModal.Body>
      <ModalProductConfirm
        modalItem={modalItem}
        handleCloseModal={props.handleCloseModal}
      />
    </>
  );
};
export default ModalProduct;
