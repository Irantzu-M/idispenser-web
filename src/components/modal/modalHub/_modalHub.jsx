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
//--clayuiform import { ClaySelect } from "@clayui/form";

const ModalHub = (props) => {
  const modalItemType = props.itemType;
  // CAMPOS A MOSTRAR - código de artículo y descripción.
  // const fieldsToSearchIn = ["reference", "label"];

  // TODO - Use api
  const [modalItem, setModalItem] = useState([]);
  //const [replaceItem, setReplaceItem] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      fetch(
        "http://127.0.0.1:5500/src/mocks/modals/_mockModalResults" +
          capitalize(modalItemType) +
          ".json"
      )
        .then((response) => response.json())
        .then((rawData) => setData(rawData));
    }
    if (!data[0]) {
      fetchData();
    }
    async function fetchModalItem() {
      fetch(
        "http://127.0.0.1:5500/src/mocks/modals/_mockModal" +
          // TODO - recuperar esto
          //capitalize(modalItemType) +
          //props.item.id +
          "Hubs111111" +
          ".json"
      )
        .then((response) => response.json())
        .then((itemData) => setModalItem(itemData[0]));
    }
    if (!modalItem[0]) {
      fetchModalItem();
    }
  }, [data, modalItem]);

  // SELECT
  const [clients, setClients] = useState([]);
  useEffect(() => {
    async function fetchClients() {
      fetch("http://127.0.0.1:5500/src/mocks/filters/_mockClients.json")
        .then((response) => response.json())
        .then((allClients) => {
          setClients(allClients);
        });
    }
    fetchClients();
  }, []);
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    async function fetchWarehouses() {
      fetch("http://127.0.0.1:5500/src/mocks/modals/_mockWarehouses.json")
        .then((response) => response.json())
        .then((allWarehouses) => {
          setWarehouses(allWarehouses);
        });
    }
    fetchWarehouses();
  }, []);
  const [hubPosition, setHubPosition] = useState([]);
  useEffect(() => {
    async function fetchHubPosition() {
      fetch("http://127.0.0.1:5500/src/mocks/modals/_mockHubPosition.json")
        .then((response) => response.json())
        .then((allHubs) => {
          setHubPosition(allHubs);
        });
    }
    fetchHubPosition();
  }, []);

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
                      <span>{modalItem["id"]}</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Last connection: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>{modalItem["last connection"]}</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Alias IDC: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {/* //TODO - alias IDC */}
                      <span>ALIAS IDC</span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Identificador de armario SensorBox: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>
                        {modalItem["identificador armario sensorbox"]}
                      </span>
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Período de muestreo: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      <span>{modalItem["periodo de muestreo"]}</span>
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
                          placeholder={modalItem["customer"]}
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
                          placeholder={modalItem["warehouse id"]}
                        />
                      )}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Posición del HUB: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {hubPosition[0] && (
                        <SearchSectionAutocomplete
                          options={hubPosition}
                          formControl={true}
                          handleChange={handleChange}
                          cellsToDisplay={fieldsToDisplay}
                          cellsToSearchIn={fieldsToSearchIn}
                          placeholder={modalItem["hub position"]}
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
                        placeholder={modalItem["tipo de redondeo"]}
                      />
                    </ClayTable.Cell>
                  </ClayTable.Row>
                  <ClayTable.Row>
                    <ClayTable.Cell>
                      <span>Número de serie del armario: </span>
                    </ClayTable.Cell>
                    <ClayTable.Cell className="fw-bold">
                      {clients[0] && (
                        <SearchSectionAutocomplete
                          options={[
                            { "ref num": "kghaodgaj" },
                            { "ref num": "fslkafj0l" },
                            { "ref num": "ragtsvbav" },
                          ]}
                          formControl={true}
                          handleChange={handleChange}
                          placeholder={
                            modalItem["identificador armario sensorbox"]
                          }
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
            <DefaultTable
              params={props.params}
              // TODO - Corregir esto de forma que sea dinámico y haga la llamada que tiene que hacer
              itemType={"sensors"}
              modalItem={modalItem}
              tableQuery={"/results/" + "_mockResultsSensors.json"}
              handleOpenModal={() => {}}
            />
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
