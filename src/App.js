import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { Switch, Route, BrowserRouter } from "react-router-dom";

//pages
import Dashboard from "./pages/dashboard/Dashboard";
import Blank from "./pages/blank/Blank";
import KeyValuePairs from "./pages/Subjects/KeyValuePairs";

import "./sbadmin2-min.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/blank" component={Blank} />
          <Route path="/KeyValue/list/:paramName" component={KeyValuePairs} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
