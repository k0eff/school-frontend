import { combineReducers } from "redux";
import KeyValueReducer from "./KeyValueReducer";

export default combineReducers({
  keyValue: KeyValueReducer
});
