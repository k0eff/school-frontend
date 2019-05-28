import {
  EDUPLAN_ERR,
  EDUPLAN_LOADING,
  EDUPLAN_FINISH_SIGNAL,
  EDUPLAN_START_SIGNAL,
  EDUPLAN_GET_EDUPLANS,
  EDUPLAN_ADD_EDUPLAN,
  EDUPLAN_GET_PARAM_VALUES
} from "./actionTypes";

import axios from "axios";

export const startSignal = () => dispatch => {
  dispatch({
    type: EDUPLAN_START_SIGNAL
  });
};

export const finishSignal = () => dispatch => {
  dispatch({
    type: EDUPLAN_FINISH_SIGNAL
  });
};

export const loading = () => dispatch => {
  dispatch({
    type: EDUPLAN_LOADING
  });
};

export const getEduPlans = () => dispatch => {
  startSignal();

  axios
    .get("/api/eduPlan/eduPlan/")
    .then(res => {
      dispatch({
        type: EDUPLAN_GET_EDUPLANS,
        payload: res.data
      });
      dispatch(finishSignal());
    })
    .catch(e => {
      dispatch({
        type: EDUPLAN_ERR,
        payload: e.response.data
      });
    });
};

export const addEduPlan = data => dispatch => {
  dispatch(startSignal());

  const { name, schoolingYear, classLetter } = data; //will generate error if anything is missing

  axios
    .post("/api/eduPlan/eduPlan/", { name, schoolingYear, classLetter })
    .then(res => {
      dispatch({
        type: EDUPLAN_ADD_EDUPLAN,
        payload: res.data
      });
      dispatch(finishSignal());
    })
    .catch(e => {
      dispatch({
        type: EDUPLAN_ERR,
        payload: e.response.data
      });
    });
};

export const getParamValuesbyParamName = paramName => dispatch => {
  dispatch(startSignal());
  axios
    .get("/api/params/value/paramName/" + paramName)
    .then(res => {
      dispatch({
        type: EDUPLAN_GET_PARAM_VALUES,
        paramName,
        payload: res.data
      });
      dispatch(finishSignal());
    })
    .catch(e => {
      dispatch({
        type: EDUPLAN_ERR,
        payload: e.response.data
      });
    });
};
