import {
  EDUPLAN_ERR,
  EDUPLAN_LOADING,
  EDUPLAN_FINISH_SIGNAL,
  EDUPLAN_START_SIGNAL,
  EDUPLAN_GET_EDUPLANS
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
