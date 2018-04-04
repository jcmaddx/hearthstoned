import {SET_STAGE, SET_TRANSITION, INIT_PACKS, OWN_CARD, CHANGE_COUNT, BOOK_OPENED, NEXT_PACK} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function hsReducer(state = initialState, action) {
  let newState = objectAssign({}, state);

  switch (action.type) {
    case SET_STAGE:
    	newState.stage = action.stage;
    	return newState;

    case SET_TRANSITION:
    	newState.transition = action.transition;
    	return newState;

    case INIT_PACKS:
    	newState.packs = action.packs;
    	return newState;

    case BOOK_OPENED:
    	newState.bookOpened = true;
    	return newState;

    case NEXT_PACK:
    	newState.currentPack = newState.currentPack + 1;
    	return newState;

    case CHANGE_COUNT:
    	if(action.direction === "up") {
    		newState.packCount = newState.packCount + 1;
    	} else {
    		if(newState.packCount > 0) {
	    		newState.packCount = newState.packCount - 1;
	    	}
    	}
    	return newState;

     case OWN_CARD:
		  return Object.assign({}, state, {
		    cards: Object.assign({}, state.cards, {
		    	[action.owned]: Object.assign({}, state.cards[action.owned], { owned: true })
		    })
		  });

    default:
      return state;
  }
}