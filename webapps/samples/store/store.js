import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  multiClientMiddleware,
  defaultClientName
} from "redux-axios-middleware";

import apiClient from "./api";
import { ActionTypes } from "./action";

const initApiState = {
  loading: false,
  error: null,
  message: null,
  data: {}
};

const apiState = (state = initApiState, action) => {
  let error = null;
  switch (action.type) {
    case ActionTypes.CLEAR_ALL:
      return initApiState;
    case ActionTypes.ACTION_SUBMIT:
      return {
        ...state,
        loading: true,
        data: {},
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
        ...state,
        loading: false,
        error: error,
        lastAction: action,
      };
    case ActionTypes.ACTION_SUBMIT_SUCCESS:
      console.log("ACTION_SUBMIT_SUCCESS", action);
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        lastAction: action,
      };
    case ActionTypes.FETCH_DATA:
      return {
        ...state,
        loading: true,
        data: {},
        lastAction: action,
      };
    case ActionTypes.FETCH_DATA_FAIL:
      console.log("FETCH_DATA_FAIL", action);
      error = null;
      if (action.error.response) {
        error = action.error.response.data ? action.error.response.data.error : action.error.response;
      } else {
        error = action.error.toString();
      }
      return {
        ...state,
        loading: false,
        error: error,
        lastAction: action,
      };
    case ActionTypes.FETCH_DATA_SUCCESS:
      console.log("FETCH_DATA_SUCCESS", action);
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        lastAction: action,
      };
    default:
      return state;
  }
};

function lastAction(state = null, action) {
  return action;
}

export const createRootReducer = () =>
  combineReducers({
    apiState,
    lastAction,
  })

export default function configureStore(preloadedState) {
  const store = createStore(
    apiState,
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        multiClientMiddleware(
          Object.defineProperty({
            "default": { client: apiClient },
          },
            defaultClientName,
            { client: apiClient })),
      ),
    ),
  )
  return store;
}