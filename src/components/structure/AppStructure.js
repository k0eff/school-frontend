import React from "react";
import { Provider } from "react-redux";
import store from "../../reducers/store";
import { BrowserRouter } from "react-router-dom";

export default function AppStructure(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
}
