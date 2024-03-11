import React from "react";
import Filters from "./components/filters/_filters";
import Results from "./components/results/_results";

function App() {
  return (
    <>
      <div className="container py-5">
        <Filters />
        <Results />
      </div>
    </>
  );
}

export default App;
