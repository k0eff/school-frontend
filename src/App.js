import React, { Fragment } from "react";
import Menu from "./components/menu";
import ContentWrapper from "./components/contentWrapper/contentWrapper";
import "./sbadmin2-min.css";

function App() {
  return (
    <Fragment>
      <div id="wrapper">
        <Menu />
        <ContentWrapper />
      </div>
    </Fragment>
  );
}

export default App;
