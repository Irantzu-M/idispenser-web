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

    if (endpoint != "") {
      try {
        setData(fetchResultData(selectedTab, endpoint));
        console.log("results");
      } catch (error) {
        console.log("no results");
      }
    }
  }, [filters]);

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
                {/* {itemTypeToFind === "huberror" ? (
                <>
                  <ResultTable
                    params={props.params}
                    itemType={itemTypeToFind}
                    handleOpenModal={handleOpenModal}
                    fixedTableCols={["status", "customer"]}
                  ></ResultTable>
                </>
              ) : (
                <ResultTable
                  params={props.params}
                  itemType={itemTypeToFind}
                  handleOpenModal={handleOpenModal}
                ></ResultTable>
              )} */}
                {
                  // TODO - terminar modales de tabla default, descomentarlo porque funciona, pero necesita modales
                }

                <DefaultTable
                  striped
                  orderable
                  customHeader=""
                  // endpoint={endpoint}
                  data={data}
                  itemType={itemTypeToFind}
                  fixedTableCols={[
                    "status",
                    "customer",
                    "warehouse id",
                    "warehouse name",
                    "hub id",
                  ]}
                ></DefaultTable>
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
