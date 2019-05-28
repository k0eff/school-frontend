import {
  EDUPLAN_ERR,
  EDUPLAN_LOADING,
  EDUPLAN_FINISH_SIGNAL,
  EDUPLAN_START_SIGNAL,
  EDUPLAN_GET_EDUPLANS,
  EDUPLAN_ADD_EDUPLAN,
  EDUPLAN_GET_PARAM_VALUES,
  EDUPLAN_GET_PARAM_VALUES_SCHOOLINGYEAR,
  EDUPLAN_GET_PARAM_VALUES_CLASSLETTER
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  signal: false,
  errors: {},
  data: [],
  add: {
    loading: false,
    signal: false,
    errors: {},
    schoolingYear: []
  }
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
    case EDUPLAN_ADD_EDUPLAN:
      return {
        ...state,
        loading: false,
        signal: true,
        data: action.payload
      };

    case EDUPLAN_GET_PARAM_VALUES:
      switch (action.paramName) {
        case EDUPLAN_GET_PARAM_VALUES_SCHOOLINGYEAR:
          return {
            ...state,
            add: {
              ...state.add,
              loading: false,
              signal: true,
              schoolingYear: action.payload
            }
          };

        case EDUPLAN_GET_PARAM_VALUES_CLASSLETTER:
          return {
            ...state,
            add: {
              ...state.add,
              loading: false,
              signal: true,
              schoolingYear: action.payload
            }
          };

        default:
          return {
            ...state,
            loading: false,
            signal: false,
            error: {}
          };
      }

    default:
      return initialState;
  }
}
