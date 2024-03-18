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

  const fetchResultData = useResultsStore((state) => state.fetchResultData);
  const updateResults = useResultsStore((state) => state.updateResults);
  const setUpdateResults = useResultsStore((state) => state.setUpdateResults);

  const [fixedTableCols, setFixedTableCols] = useState([]);

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
          "idCliente",
          "idAlmacenQuirofano",
          "almacenName",
          "idConcentrador",
        ]);
      }

      // TODO - hacer un remap distinto para cada resultado
      function remap(dataToremap) {
        const rmd = dataToremap.map((item) => {
          return {
            id: item.idSensor,
            "Código sensor": item.idSensor,
            "Posición ": item.sensorPosition,
            "HUB ": item.idConcentrador,
            "Cliente ": item.idCliente,
            "Almacén ": item.almacenName,
            "Tipo ": item.tipoSensor,
          };
        });
        return rmd;
      }
    }
  }, [itemTypeToFind, updateResults]);

  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState([]);
  const handleOpenModal = (item) => {
    setOpenModal(!openModal);
    setItem(item);
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
                  <div>Buscando</div>
                ) : (
                  <>
                    {data[0] && (
                      <DefaultTable
                        striped
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
          item={item}
          itemType={itemTypeToFind}
        ></ModalEdit>
      )}
    </>
  );
};

export default Results;
