import React from "react";
import Menu from "./components/menu";
import TopBarWrapper from "./components/wrappers/topBarWrapper";
import MainWrapper from "./components/wrappers/mainWrapper";
import { Switch, Route, BrowserRouter } from "react-router-dom";

//pages
import Dashboard from "./pages/dashboard/Dashboard";
import Blank from "./pages/blank/Blank";
import Subjects from "./pages/Subjects/Subjects";

import "./sbadmin2-min.css";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Menu />

        <TopBarWrapper>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/blank" component={Blank} />
            <Route path="/subjects" component={Subjects} />
          </Switch>
        </TopBarWrapper>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
