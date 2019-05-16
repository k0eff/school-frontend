import React, { Fragment } from "react";
import Menu from "./components/menu";
import ContentWrapper from "./components/wrappers/contentWrapper";
import MainWrapper from "./components/wrappers/mainWrapper";

import Blank from "./pages/blank/blank";

import "./sbadmin2-min.css";

function App() {
  return (
    <Fragment>
      <MainWrapper>
        <Menu />
        <ContentWrapper>
          <Blank />
        </ContentWrapper>
      </MainWrapper>
    </Fragment>
  );
}

export default App;
