import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

//pages
import Dashboard from "./pages/dashboard/Dashboard";
import Blank from "./pages/blank/Blank";
import ListKeyValuePairs from "./pages/KeyValue/ListKeyValuePairs";
import AddKeyValuePairs from "./pages/KeyValue/AddKeyValuePairs";

import "./sbadmin2-min.css";
import ListEduPlans from "./pages/eduPlan/ListEduPlans";
import AddEduPlans from "./pages/eduPlan/AddEduPlans";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/blank" component={Blank} />
          <Route
            path="/KeyValue/list/:paramName/:pageNum?"
            component={ListKeyValuePairs}
          />
          <Route path="/KeyValue/add/:paramName" component={AddKeyValuePairs} />
          <Route path="/eduPlan/list/:pageNum?" component={ListEduPlans} />
          <Route path="/eduPlan/addEdit/:eduPlanId?" component={AddEduPlans} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
