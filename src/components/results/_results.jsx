import React, { useEffect, useState } from "react";
import { useFilterButtonsStore } from "../../stores/filtersStore";
import ResultTable from "../results/_resultTable";
import ResultsAppliedFilters from "./_resultsAppliedFilters";
import ModalEdit from "../modal/_modalEdit";
import ResultsActionbarButtons from "./_resultsActionbarButtons";
import ResultsOptionGroup from "./_resultsOptionGroup";
import useResultsStore from "../../stores/resultsStore";
import DefaultTable from "../tables/_defaultTable";
import { capitalize } from "../../functions/functions";

const Results = (props) => {
  // TODO - Use api
  // TODO - los buttons en realidad no van a ser un mock, podemos ponerlos como archivo normal e importarlos
  const [buttons, setButtons] = useState(
    useFilterButtonsStore((state) => state.buttons)
  );

  const itemTypeToFind = useFilterButtonsStore((state) => state.itemTypeToFind);

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
        {itemTypeToFind !== "" && itemTypeToFind !== undefined && (
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
              {itemTypeToFind === "huberror" ? (
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
              )}
              {
                // TODO - terminar modales de tabla default, descomentarlo porque funciona, pero necesita modales
              }
              {/* {itemTypeToFind == "huberror" ? (
                <DefaultTable
                  striped
                  orderable
                  customHeader=""
                  tableQuery={
                    "results/_mockResults" +
                    capitalize(itemTypeToFind) +
                    ".json"
                  }
                  itemType={itemTypeToFind}
                  fixedTableCols={[
                    "status",
                    "customer",
                    "warehouse id",
                    "warehouse name",
                    "hub id",
                  ]}
                ></DefaultTable>
              ) : (
                <DefaultTable
                  striped
                  orderable
                  customHeader=""
                  tableQuery={
                    "results/_mockResults" +
                    capitalize(itemTypeToFind) +
                    ".json"
                  }
                  itemType={itemTypeToFind}
                ></DefaultTable>
              )} */}
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
