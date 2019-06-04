import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./index";

const initialState = {};

const middleware = [thunk];

const composeEnhanced = () => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "development")
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && //mount redux devtools only in development server
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  else return compose(applyMiddleware(...middleware)); //dont mount redux devtools in jest
};

const store = createStore(rootReducer, initialState, composeEnhanced());

export default store;
