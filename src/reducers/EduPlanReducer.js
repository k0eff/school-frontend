import {
  EDUPLAN_ERR,
  EDUPLAN_LOADING,
  EDUPLAN_FINISH_SIGNAL,
  EDUPLAN_START_SIGNAL,
  EDUPLAN_GET_EDUPLANS
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  signal: false,
  errors: {},
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDUPLAN_START_SIGNAL:
      return {
        ...state,
        loading: true,
        signal: false
      };
    case EDUPLAN_LOADING:
      return {
        ...state,
        loading: true
      };

    case EDUPLAN_ERR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case EDUPLAN_FINISH_SIGNAL:
      return {
        ...state,
        loading: false,
        signal: true
      };

    case EDUPLAN_GET_EDUPLANS:
      return {
        ...state,
        loading: false,
        signal: true,
        data: action.payload
      };

    default:
      return initialState;
  }
}
