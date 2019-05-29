import {
  EDUPLAN_ERR,
  EDUPLAN_LOADING,
  EDUPLAN_FINISH_SIGNAL,
  EDUPLAN_START_SIGNAL,
  EDUPLAN_GET_EDUPLANS,
  EDUPLAN_GET_PARAM_VALUES,
  EDUPLAN_ADD_START_SIGNAL,
  EDUPLAN_ADD_FINISH_SIGNAL,
  EDUPLAN_ADD_EDUPLAN,
  EDUPLAN_ADD_ERR,
  EDUPLAN_GET_EDUPLAN_SINGLE,
  EDUPLAN_GET_EDUPLAN_SINGLE_ERROR
} from "./actionTypes";

import axios from "axios";
import isEmpty from "../utils/is-empty";

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

export const startSignalAdd = () => dispatch => {
  dispatch({
    type: EDUPLAN_ADD_START_SIGNAL
  });
};

export const finishSignalAdd = () => dispatch => {
  dispatch({
    type: EDUPLAN_ADD_FINISH_SIGNAL
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
  dispatch(startSignalAdd());

  let { name, schoolingYear, classLetter, eduPlanId } = data; //will generate error if anything is missing

  axios
    .post("/api/eduPlan/eduPlan/" + eduPlanId, {
      name,
      schoolingYear,
      classLetter
    })
    .then(res => {
      dispatch({
        type: EDUPLAN_ADD_EDUPLAN,
        payload: res.data
      });
      dispatch(finishSignalAdd());
    })
    .catch(e => {
      dispatch({
        type: EDUPLAN_ADD_ERR,
        payload: e.response.data
      });
    });
};

export const getEduPlanSingleById = (
  eduPlanId,
  loadedEduPlans = []
) => dispatch => {
  startSignal();

  // receives already loaded eduPlans (from the listing page) and checks whether it has been already cached in state
  let eduPlanPreloaded = [];
  if (!isEmpty(loadedEduPlans)) {
    eduPlanPreloaded = loadedEduPlans.filter(item => {
      return item._id === eduPlanId;
    });
  }

  if (!isEmpty(eduPlanPreloaded)) {
    // dispatch it if there already is a preloaded one
    dispatch({
      type: EDUPLAN_GET_EDUPLAN_SINGLE,
      payload: eduPlanPreloaded
    });
    dispatch(finishSignal());
  } else {
    axios
      .get("/api/eduPlan/eduPlan/" + eduPlanId)
      .then(res => {
        //check if server has returned empty array (no EduPlans found)
        if (isEmpty(res.data)) {
          dispatch({
            type: EDUPLAN_GET_EDUPLAN_SINGLE_ERROR,
            payload: { message: "Not found" }
          });
        } else {
          dispatch({
            type: EDUPLAN_GET_EDUPLAN_SINGLE,
            payload: res.data
          });
        }

        dispatch(finishSignal());
      })
      .catch(e => {
        dispatch({
          type: EDUPLAN_GET_EDUPLAN_SINGLE_ERROR,
          payload: e.response.data
        });
      });
  }
};
