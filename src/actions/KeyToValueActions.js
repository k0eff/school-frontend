import axios from "axios";
import {
  KEYVALUE_ERR,
  KEYVALUE_LOADING,
  KEYVALUE_GET_PARAM_VALUES,
  KEYVALUE_START_SIGNAL,
  KEYVALUE_FINISH_SIGNAL,
  KEYVALUE_ADD_ERROR,
  KEYVALUE_ADD_SUCCESS,
  KEYVALUE_ADD_LOADING
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

export const shouldILoadParamData = (
  paramName,
  currentStateKeyValueData,
  cacheSecs
) => dispatch => {
  if (currentStateKeyValueData[paramName]) {
    let currentDate = new Date();
    let cacheExpiryDate = new Date(
      currentDate.setSeconds(currentDate.getSeconds() - cacheSecs)
    );
    let lastUpdatedDate = new Date(
      currentStateKeyValueData[paramName].lastUpdated
    );

    if (lastUpdatedDate > cacheExpiryDate) {
      dispatch(finishSignal());
    } else {
      dispatch(checkIfParamExists(paramName));
    }
  } else {
    dispatch(checkIfParamExists(paramName));
  }
};

export const checkIfParamExists = paramName => dispatch => {
  dispatch(loading());
  axios
    .get("/api/params/param/" + paramName)
    .then(res => {
      // let tableData = this.processData(res.data, this.dataMapper);
      // this.setState(tableData);

      if (!isEmpty(res.data)) {
        dispatch(getParamValues(res.data[0]._id, paramName));
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

export const getParamValues = (paramId, paramName) => dispatch => {
  axios
    .get("/api/params/value/" + paramId)
    .then(res => {
      let data = {
        paramName,
        data: res.data
      };

      dispatch({
        type: KEYVALUE_GET_PARAM_VALUES,
        payload: data
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

export const loadingPageAdd = () => dispatch => {
  dispatch({
    type: KEYVALUE_ADD_LOADING
  });
};

export const addValue = ({ paramName, value, descr }) => dispatch => {
  dispatch(loadingPageAdd());

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
