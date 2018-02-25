import * as types from '../constants/actionTypes';

// example of a thunk using the redux-thunk middleware
export function setStage(num) {
  return function (dispatch) {
    return dispatch({
    	type: types.SET_STAGE,
      stage: num
    });
  };
}

export function setTransition(trans) {
  return function (dispatch) {
    return dispatch({
    	type: types.SET_TRANSITION,
      transition: trans
    });
  };
}