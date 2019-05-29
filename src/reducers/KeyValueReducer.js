import {
  KEYVALUE_CHECK_IF_PARAM_EXISTS,
  KEYVALUE_ERR,
  KEYVALUE_LOADING,
  KEYVALUE_GET_PARAM_VALUES,
  KEYVALUE_FINISH_SIGNAL,
  KEYVALUE_START_SIGNAL,
  KEYVALUE_ADD_SUCCESS,
  KEYVALUE_ADD_ERROR,
  KEYVALUE_ADD_LOADING,
  EDUPLAN_ADD_EDUPLAN
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  errors: {},
  data: {},
  signal: false,
  add: {
    loading: false,
    value: {},
    error: {}
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case KEYVALUE_START_SIGNAL:
      return {
        ...state,
        loading: true,
        signal: false
      };
    case KEYVALUE_LOADING:
      return {
        ...state,
        loading: true
      };
    case KEYVALUE_CHECK_IF_PARAM_EXISTS:
      return {
        ...state,
        errors: {},
        param: action.payload
      };
    case KEYVALUE_ERR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case KEYVALUE_GET_PARAM_VALUES:
      return {
        ...state,
        errors: {},
        data: {
          ...state.data,
          [action.payload.paramName]: {
            lastUpdated: new Date(),
            data: action.payload.data
          }
        }
      };
    case KEYVALUE_FINISH_SIGNAL:
      return {
        ...state,
        loading: false,
        signal: true
      };
    case KEYVALUE_ADD_SUCCESS:
      return {
        ...state,

        add: {
          loading: false,
          value: action.payload,
          error: {}
        }
      };

    case KEYVALUE_ADD_ERROR:
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.payload
        }
      };

    case KEYVALUE_ADD_LOADING:
      return {
        ...state,
        add: {
          ...state.add,
          loading: true
        }
      };

    default:
      return initialState;
  }
}
