import React, { useEffect, useState } from "react";
import useFilterStore, {
  useFilterButtonsStore,
} from "../../stores/filtersStore";
import ResultsAppliedFilters from "./_resultsAppliedFilters";
import ModalEdit from "../modal/_modalEdit";
import ResultsActionbarButtons from "./_resultsActionbarButtons";
import ResultsOptionGroup from "./_resultsOptionGroup";
import useResultsStore from "../../stores/resultsStore";
import DefaultTable from "../tables/_defaultTable";

const Results = (props) => {
  const [data, setData] = useState([]);
  // const [buttons, setButtons] = useState(
  //   useFilterButtonsStore((state) => state.buttons)
  // );

  const itemTypeToFind = useFilterButtonsStore((state) => state.itemTypeToFind);
  const filters = useFilterStore((state) => state.filters);
  let endpoint = itemTypeToFind + "/list?";
  // TODO - borrar este if cuando este hecho en API
  if (
    itemTypeToFind == "articulos" ||
    itemTypeToFind == "almacenes" ||
    itemTypeToFind == "clients"
  ) {
    endpoint = itemTypeToFind + "?";
  }

  const fetchResultData = useResultsStore((state) => state.fetchResultData);
  const updateResults = useResultsStore((state) => state.updateResults);
  const setUpdateResults = useResultsStore((state) => state.setUpdateResults);

  const [fixedTableCols, setFixedTableCols] = useState([]);
  const [displayCols, setDisplayCols] = useState([]);

  useEffect(() => {
    filters.map((item) => {
      if (item.name == "client") {
        item.selected.map((selected) => {
          endpoint = endpoint + "clientIds=" + selected.id + "&";
        });
      } else if (item.name == "storage") {
        item.selected.map((selected) => {
          endpoint = endpoint + "almacenIds=" + selected.id + "&";
        });
      } else if (item.name == "product") {
        item.selected.map((selected) => {
          endpoint = endpoint + "articuloIds=" + selected.id + "&";
        });
      } else if (item.name == "hub") {
        item.selected.map((selected) => {
          endpoint = endpoint + "concentradorIds=" + selected.id + "&";
        });
      } else if (item.name == "sensortype") {
        item.selected.map((selected) => {
          endpoint = endpoint + "tipoSensor=" + selected.id + "&";
        });
      }
    });

    if (endpoint != "" && itemTypeToFind != "" && updateResults) {
      try {
        fetchResultData(endpoint)
          .then((data) => {
            setData(data);
            setUpdateResults(false);
          })
          .catch((error) => {
            console.error("Fallo", error);
          });
      } catch (error) {
        console.error("No hay resultados");
      }

      if (itemTypeToFind == "sensors") {
        setFixedTableCols([
          "status",
          "comments",
          "idCliente",
          "tipoSensor",
          "idSensor",
          "sensorPosition",
        ]);
        setDisplayCols([
          "idConcentrador",
          "concentradorPosition",
          "idAlmacenQuirofano",
          "idArticulo",
          "articuloName",
          "height",
          "maxHeight",
          "weight",
          "width",
          "length",
          "schema",
          "maxUnits",
          "currentUnits",
          "currentMeasure",
          "lastConnect",
        ]);
      } else if (itemTypeToFind == "hubs") {
        setDisplayCols([
          "status",
          "idCliente",
          "idAlmacenQuirofano",
          "almacenName",
          "idConcentrador",
          "concentradorPosition",
          "lastConnect",
          "aliasIDC",
          "sensors",
          // TODO - de dónde saco este campo
          // "sensorsError",
          "roundingRef",
          "idConcentrador",
          "samplingPeriod",
        ]);
        // } else if (itemTypeToFind == "products") {
        //   setDisplayCols([
        //     // TODO - no estoy recibiendo más que id y nombre
        //     // "status",
        //     // "idCliente",
        //     // "idAlmacenQuirofano",
        //     // "almacenName",
        //     // "idConcentrador",
        //     // "concentradorPosition",
        //     // "lastConnect",
        //     // "aliasIDC",
        //     // "sensors",
        //     // "roundingRef",
        //     // "idConcentrador",
        //     // "samplingPeriod",
        //   ]);
      } else {
        setFixedTableCols([]);
      }
    }
    console.log("resultsendpoint", endpoint);
  }, [itemTypeToFind, updateResults]);

  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState([]);
  const handleOpenModal = (item) => {
    setOpenModal(!openModal);
    setModalItem(item);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div id="results-block" className="results my-5">
        {itemTypeToFind !== "" &&
          itemTypeToFind !== undefined &&
          filters[0] && (
            <>
              <div className="results--actionbar p-3">
                <div className="row">
                  <div className="col-12 d-flex flex-wrap align-items-center">
                    <ResultsOptionGroup />
                    <ResultsActionbarButtons />
                  </div>
                </div>
              </div>
              <div className="results--content bg-light  p-4">
                <ResultsAppliedFilters />
                {updateResults ? (
                  <div className="p-3 text-center">
                    No se han encontrado resultados
                  </div>
                ) : (
                  <>
                    {data[0] != [] && (
                      <DefaultTable
                        striped
                        hover
                        orderable
                        customHeader=""
                        // endpoint={endpoint}
                        data={data}
                        itemType={itemTypeToFind}
                        fixedTableCols={fixedTableCols}
                        openDetails={handleOpenModal}
                      ></DefaultTable>
                    )}
                  </>
                )}
              </div>
            </>
          )}
      </div>
      {itemTypeToFind && (
        <ModalEdit
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          item={modalItem}
          itemType={itemTypeToFind}
        ></ModalEdit>
      )}
    </>
  );
};

export default Results;
