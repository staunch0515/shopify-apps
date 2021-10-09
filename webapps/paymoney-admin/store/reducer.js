import { combineReducers } from "redux";
import { ActionTypes } from "./action";

const initActionState = {
  loading: false,
  error: null,
  message: null,
};

const resState = (state = initialPostState, action) => {
  let error = null;
  switch (action.type) {
    case ActionTypes.CLEAR_ALL:
      console.log("________________________________")
      return initialPostState;
    case ActionTypes.ACTION_SUBMIT:
      return {
        loading: true,
        error: null,
        result: null,
        lastAction: action,
      };
    case ActionTypes.ACTION_SUBMIT_FAIL:
      console.log("ACTION_SUBMIT_FAIL", action);
      error = null;
      if (action.error.response && action.error.response.data) {
        error = action.error.response.data.error;
      } else {
        error = action.error.toString();
      }
      return {
        loading: false,
        error: error,
        message: null,
        lastAction: action,
      };
    case ActionTypes.ACTION_SUBMIT_SUCCESS:
      console.log("ACTION_SUBMIT_SUCCESS", action);
      return {
        loading: false,
        error: null,
        data: action.payload.data,
        lastAction: action,
      };
    case ActionTypes.FETCH_DATA:
      return {
        loading: true,
        error: null,
        result: null,
        lastAction: action,
      };
    case ActionTypes.FETCH_DATA_FAIL:
      console.log("FETCH_DATA_FAIL", action);
      error = null;
      if (action.error.response) {
        error = action.error.response.data.error;
      } else {
        error = action.error.toString();
      }
      return {
        loading: false,
        error: error,
        message: null,
        lastAction: action,
      };
    case ActionTypes.FETCH_DATA_SUCCESS:
      console.log("FETCH_DATA_SUCCESS", action);
      return {
        loading: false,
        error: null,
        data: action.payload.data,
        lastAction: action,
      };
    default:
      return state;
  }
};


export default resState;
