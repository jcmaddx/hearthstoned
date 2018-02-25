import {SET_STAGE, SET_TRANSITION} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function hsReducer(state = initialState, action) {
  let newState = objectAssign({}, state);;

  switch (action.type) {
    case SET_STAGE:
    	newState.stage = action.stage;
    	return newState;

    case SET_TRANSITION:
    	newState.transition = action.transition;
    	return newState;
    
    default:
      return state;
  }
}