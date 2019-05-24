import { combineReducers } from "redux";
import KeyValueReducer from "./KeyValueReducer";
import EduPlanReducer from "./EduPlanReducer";

export default combineReducers({
  keyValue: KeyValueReducer,
  eduPlan: EduPlanReducer
});
