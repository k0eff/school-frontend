import {
  EDUPLAN_ERR,
  EDUPLAN_LOADING,
  EDUPLAN_FINISH_SIGNAL,
  EDUPLAN_START_SIGNAL,
  EDUPLAN_GET_EDUPLANS,
  EDUPLAN_GET_PARAM_VALUES,
  EDUPLAN_GET_PARAM_VALUES_SCHOOLINGYEAR,
  EDUPLAN_GET_PARAM_VALUES_CLASSLETTER,
  EDUPLAN_ADD_START_SIGNAL,
  EDUPLAN_ADD_FINISH_SIGNAL,
  EDUPLAN_ADD_EDUPLAN,
  EDUPLAN_ADD_ERR,
  EDUPLAN_GET_EDUPLAN_SINGLE,
  EDUPLAN_GET_EDUPLAN_SINGLE_ERROR,
  EDUPLAN_GET_EDUPLANDATA,
  EDUPLAN_ADD_EDUPLANDATA
} from "../actions/actionTypes";
import isEmpty from "../utils/is-empty";

const initialState = {
  loading: false,
  signal: false,
  errors: {},
  data: [],
  add: {
    loading: false,
    signal: false,
    errors: {},
    status: {}
  },
  single: {
    eduPlan: {},
    errors: {}
  },
  eduPlanData: {
    eduPlanData: {},
    errors: {}
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
      } //EOF switch (action.paramName)

    case EDUPLAN_ADD_START_SIGNAL:
      return {
        ...state,
        add: {
          ...state.add,
          loading: true,
          signal: false
        }
      };

    case EDUPLAN_ADD_FINISH_SIGNAL:
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          signal: true
        }
      };

    case EDUPLAN_ADD_EDUPLAN:
      return {
        ...state,
        add: {
          ...state.add,
          status: action.payload
        }
      };

    case EDUPLAN_ADD_ERR:
      return {
        ...state,
        add: {
          ...state.add,
          error: action.payload
        }
      };

    case EDUPLAN_GET_EDUPLAN_SINGLE:
      return {
        ...state,
        single: {
          ...state.single,
          eduPlan: action.payload
        }
      };

    case EDUPLAN_GET_EDUPLAN_SINGLE_ERROR:
      return {
        ...state,
        single: {
          ...state.single,
          errors: action.payload
        }
      };

    case EDUPLAN_GET_EDUPLANDATA:
      return {
        ...state,
        eduPlanData: {
          ...state.eduPlanData,
          eduPlanData: action.payload
        }
      };

    case EDUPLAN_ADD_EDUPLANDATA:
      return {
        ...state,
        add: {
          ...state.add,
          status: action.payload
        }
      };

    default:
      if (isEmpty(state) || state === initialState) return initialState;
      else return { ...state };
  }
}
