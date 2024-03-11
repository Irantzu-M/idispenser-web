import React from "react";
import { useEffect, useState } from "react";
import ClayModal from "@clayui/modal";
import ModalHubConfirm from "./_modalHubConfirm";
import ClayTable from "@clayui/table";
import { capitalize } from "../../../functions/functions";
import DefaultTable from "../../tables/_defaultTable";
import SearchSectionAutocomplete from "../../customSearchSelect/_searchSectionAutocomplete";

const ModalImport = (props) => {
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
            <span className="icon icon-wrench"></span>MODAL IMPORT
          </h4>
        </div>
      </div>
      <ClayModal.Body className="border my-4">
        <div className="modal-body--name">BODY NAME</div>
        <div className="modal--section px-3">
          <div className="row">
            <div className="col-lg">COL LG</div>
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
export default ModalImport;
