import React, { Fragment } from "react";
import "./App.css";

//components

import InputHW from "./components/InputHW";
import ListHW from "./components/ListHW";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputHW />
        <ListHW />
      </div>
    </Fragment>
  );
}

export default App;