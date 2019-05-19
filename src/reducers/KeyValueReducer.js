import {
  KEYVALUE_CHECK_IF_PARAM_EXISTS,
  KEYVALUE_ERR,
  KEYVALUE_LOADING,
  KEYVALUE_GET_PARAM_VALUES,
  KEYVALUE_FINISH_SIGNAL,
  KEYVALUE_START_SIGNAL,
  KEYVALUE_ADD_SUCCESS,
  KEYVALUE_ADD_ERROR
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  errors: {},
  values: [],
  signal: false
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
        values: action.payload
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
        loading: false,
        values: action.payload
      };

    case KEYVALUE_ADD_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return initialState;
  }
}
