import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ModalHubConfirm from "./_modalHubConfirm";
import ClayTable from "@clayui/table";
import ClayTableRow from "@clayui/table/lib/Row";
import ClayTableCell from "@clayui/table/lib/Cell";
import { capitalize } from "../../../functions/functions";
import DefaultTable from "../../tables/_defaultTable";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";
import { fetchApi } from "../../../api/idispenserApi";
//--clayuiform import { ClaySelect } from "@clayui/form";

const ModalHub = (props) => {
  const modalItemType = props.itemType;
  const modalItem = props.item;

  // ---------------------- CLIENTES
  // TEXTO DE BÚSQUEDA
  const [clientSearchedText, setClientSearchedText] = useState("");
  const handleClientChange = (text) => {
    if (text != "" && text != undefined) {
      setClientSearchedText(text);
    }
  };
  // LLAMADA A API para CLIENTES
  const [clients, setClients] = useState([{}]);
  useEffect(() => {
    if (clientSearchedText.length >= 3) {
      const fetchData = async (clientEndpoint) => {
        try {
          const response = await fetchApi(clientEndpoint);
          const rawData = await response["items"];

          if (rawData[0]) {
            setClients(remap(rawData));
          }
          //return rawData;
        } catch (error) {
          throw error;
        }

        function remap(dataToRemap) {
          const rmd = dataToRemap.map((item) => {
            const id = item.idClient;
            return { ...item, id };
          });
          return rmd;
        }
      };

      const clientEndpoint = `clients?search=${clientSearchedText}`;
      fetchData(clientEndpoint);
    }
  }, [clientSearchedText]);

  // ---------------------- fin CLIENTES

  // ---------------------- ALMACENES
  // TEXTO DE BÚSQUEDA
  const [warehouseSearchedText, setWarehouseSearchedText] = useState("");
  const handleWarehouseChange = (text) => {
    if (text != "" && text != undefined) {
      setWarehouseSearchedText(text);
    }
  };
  // LLAMADA A API para ALMACENES
  const [warehouses, setWarehouses] = useState([{}]);
  useEffect(() => {
    if (warehouseSearchedText.length >= 3) {
      const fetchData = async (clientEndpoint) => {
        try {
          const response = await fetchApi(clientEndpoint);
          const rawData = await response["items"];

          if (rawData[0]) {
            setWarehouses(remap(rawData));
          }
          //return rawData;
        } catch (error) {
          throw error;
        }

        function remap(dataToRemap) {
          const rmd = dataToRemap.map((item) => {
            const id = item.idWarehouse;
            return { ...item, id };
          });
          return rmd;
        }
      };

      const clientEndpoint = `almacenes?search=${searchedText}`;
      fetchData(clientEndpoint);
    }
  }, [warehouseSearchedText]);
  // ---------------------- fin ALMACENES

  // ---------------------- POSICIONHUB
  // TEXTO DE BÚSQUEDA
  const [posicionHubSearchedText, setPosicionHubSearchedText] = useState("");
  const handlePosicionHubChange = (text) => {
    if (text != "" && text != undefined) {
      setPosicionHubSearchedText(text);
    }
  };
  // LLAMADA A API para POSICIONHUB
  const [posicionHubs, setPosicionHubs] = useState([{}]);
  useEffect(() => {
    if (posicionHubSearchedText.length >= 3) {
      const fetchData = async (posicionHubEndpoint) => {
        try {
          const response = await fetchApi(posicionHubEndpoint);
          const rawData = await response["items"];

          if (rawData[0]) {
            setPosicionHubs(remap(rawData));
          }
          //return rawData;
        } catch (error) {
          throw error;
        }

        function remap(dataToRemap) {
          const rmd = dataToRemap.map((item) => {
            const id = item.idPosicionHub;
            return { ...item, id };
          });
          return rmd;
        }
      };

      const posicionHubEndpoint = `hubs/list?search=${searchedText}`;
      fetchData(posicionHubEndpoint);
    }
  }, [posicionHubSearchedText]);
  // ---------------------- fin POSICIONHUB

  // LLAMADA A API para SENSORES
  const [sensors, setSensors] = useState([{}]);
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

  // SEARCH TEXT
  const fieldsToSearchIn = ["Código", "Cliente"];
  const fieldsToDisplay = ["Código", "Cliente"];
  const [searchedText, setSearchedText] = useState("");
  const handleChange = (text) => {
    setSearchedText(text);
  };
  return (
    <>
      <div className="modal--section borderless">
        <div className="modal--name d-flex justify-content-between align-items-center">
          <h4 className="modal--name--txt">
            <span className="icon icon-wrench"></span>HUB Maintenance
          </h4>
          {/*<div className="d-flex justify-content-end">
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
            </div>*/}
        </div>
      </div>
      <ClayModal.Body className="border my-4">
        <div className="modal-body--name">HUB data</div>
        <div className="modal--section px-3">
          <div className="row">
            <div className="col-lg">
              <ClayTable
                borderedColumns={false}
                borderless={true}
                hover={false}
                striped={false}
                className="table-borderless"
              >
                <ClayTable.Body>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>HUB ID: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>{modalItem.idConcentrador}</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Last connection: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>{modalItem.lastConnect}</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Alias IDC: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>{modalItem.aliasIDC}</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Identificador de armario SensorBox: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>
                        {/* TODO - comprobar que este es el campo */}
                        {modalItem.idAlmacenQuirofano}
                      </span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Período de muestreo: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>{modalItem.samplingPeriod}</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                </ClayTable.Body>
              </ClayTable>
            </div>
            <div className="col-lg">
              <ClayTable
                borderedColumns={false}
                borderless={true}
                hover={false}
                striped={false}
                className="table-borderless"
              >
                <ClayTable.Body>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Cliente: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {clients[0] && (
                        <SearchSectionAutocomplete
                          options={clients}
                          formControl={true}
                          handleChange={handleChange}
                          cellsToDisplay={fieldsToDisplay}
                          cellsToSearchIn={fieldsToSearchIn}
                          placeholder={modalItem.idCliente}
                        />
                      )}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Almacén: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {warehouses[0] && (
                        <SearchSectionAutocomplete
                          options={warehouses}
                          formControl={true}
                          handleChange={handleChange}
                          cellsToDisplay={fieldsToDisplay}
                          cellsToSearchIn={fieldsToSearchIn}
                          placeholder={modalItem.idAlmacenQuirofano}
                        />
                      )}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Posición del HUB: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {posicionHubSearchedText[0] && (
                        <SearchSectionAutocomplete
                          options={posicionHubs}
                          formControl={true}
                          handleChange={handleChange}
                          cellsToDisplay={fieldsToDisplay}
                          cellsToSearchIn={fieldsToSearchIn}
                          placeholder={modalItem.concentradorPosition}
                        />
                      )}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Tipo de redondeo: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <SearchSectionAutocomplete
                        options={[
                          { id: "tipo de redondeo 1" },
                          { id: "tipo de redondeo 2" },
                          { id: "tipo de redondeo 3" },
                        ]}
                        formControl={true}
                        handleChange={handleChange}
                        placeholder={modalItem.roundingRef}
                      />
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Número de serie del armario: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {warehouses[0] && (
                        <SearchSectionAutocomplete
                          options={warehouses}
                          formControl={true}
                          handleChange={handleChange}
                          placeholder={modalItem.idAlmacenQuirofano}
                        />
                      )}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                </ClayTable.Body>
              </ClayTable>
            </div>
          </div>
        </div>

        <div className="modal--section pt-5">
          <div className="row">
            <p className="mb-4">Sensores/Artículos asignados a este HUB:</p>
            {/* <DefaultTable
              params={props.params}
              // TODO - Corregir esto de forma que sea dinámico y haga la llamada que tiene que hacer
              itemType={"sensors"}
              modalItem={modalItem}
              tableQuery={"/results/" + "_mockResultsSensors.json"}
              handleOpenModal={() => {}}
            /> */}

            <DefaultTable
              data={sensors}
              itemType={"sensors"}
              fieldsToDisplay={[
                "status",
                "comments",
                "idSensor",
                "sensorPosition",
                "articuloName",
                "stock",
              ]}
            ></DefaultTable>
          </div>
        </div>
      </ClayModal.Body>
      <ModalHubConfirm
        modalItem={modalItem}
        handleCloseModal={props.handleCloseModal}
      />
    </>
  );
};
export default ModalHub;
