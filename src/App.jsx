import React from "react";

import Filters from "./components/filters/_filters";
import Results from "./components/results/_results";
// import useFilterStore from "http://127.0.0.1:5500/modules/idispenser/src/main/resources/META-INF/resources/lib/stores/filtersStore";
import useFilterStore from "./stores/filtersStore";

function App() {
  //FilterStore
  const filtersStore = useFilterStore((state) => state.filters);
  return (
    <>
      <div className="container py-5">
        <Filters filterStore={filtersStore} />
        <Results />
      </div>
    </>
  );
}

export default App;
