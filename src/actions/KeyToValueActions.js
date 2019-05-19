import axios from "axios";
import {
  KEYVALUE_ERR,
  KEYVALUE_LOADING,
  KEYVALUE_GET_PARAM_VALUES,
  KEYVALUE_START_SIGNAL,
  KEYVALUE_FINISH_SIGNAL,
  KEYVALUE_ADD_ERROR,
  KEYVALUE_ADD_SUCCESS
} from "./actionTypes";
import isEmpty from "../utils/is-empty";

export const startSignal = () => dispatch => {
  dispatch({
    type: KEYVALUE_START_SIGNAL
  });
};

export const finishSignal = () => dispatch => {
  dispatch({
    type: KEYVALUE_FINISH_SIGNAL
  });
};

export const loading = () => dispatch => {
  dispatch({
    type: KEYVALUE_LOADING
  });
};

export const checkIfParamExists = paramName => dispatch => {
  dispatch(loading());
  axios
    .get("/api/params/param/" + paramName)
    .then(res => {
      // let tableData = this.processData(res.data, this.dataMapper);
      // this.setState(tableData);

      if (!isEmpty(res.data)) {
        dispatch(getParamValues(res.data[0]._id));
      } else {
        dispatch({
          type: KEYVALUE_ERR,
          payload: { error: "There is no such parameter" }
        });
      }
    })
    .catch(e => {
      dispatch({
        type: KEYVALUE_ERR,
        payload: e.response.data
      });
    });
};

export const getParamValues = paramId => dispatch => {
  axios
    .get("/api/params/value/" + paramId)
    .then(res => {
      dispatch({
        type: KEYVALUE_GET_PARAM_VALUES,
        payload: res.data
      });
      dispatch(finishSignal());
    })
    .catch(e => {
      dispatch({
        type: KEYVALUE_ERR,
        payload: e.response.data
      });
    });
};
export const addValue = ({ paramName, value, descr }) => dispatch => {
  axios
    .post("/api/params/valueByParamName", { paramName, value, descr })
    .then(res => {
      dispatch({
        type: KEYVALUE_ADD_SUCCESS,
        payload: res.data
      });
    })
    .catch(e =>
      dispatch({
        type: KEYVALUE_ADD_ERROR,
        payload: e.response.data
      })
    );
};
