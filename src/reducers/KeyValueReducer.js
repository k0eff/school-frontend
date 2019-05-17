import { KEYVALUE_GET_PARAMETERS } from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case KEYVALUE_GET_PARAMETERS:
      return;
    default:
      return initialState;
  }
}
