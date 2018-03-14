import * as types from '../constants/actionTypes';
import cards from '../data/cards';

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

export function gainCard(card){
	return function (dispatch) {
		return dispatch({
    	type: types.OWN_CARD,
      owned: card
    });
	}
}

export function initPacks() {
	return function (dispatch) {
		let packs = [];
		let packCount = (Object.keys(cards).length / 5);
		function filterByRarity(item){
			if(cards[item].rarity === 'rare'){
				return true;
			}
			return false;
		}
		function shuffleCards ( deck ) {
			let randomKeys = Object.keys(deck).sort(function() { return 0.5 - Math.random() });
			let randObj = {};
			randomKeys.map((item, key) => {
				randObj[item] = deck[item];
			});
			return randObj;
		}
		let rareCards = Object.keys(cards).filter(filterByRarity);
		rareCards = rareCards.sort(function() { return 0.5 - Math.random() });
		rareCards.splice(0, rareCards.length - packCount);
		for(let i = 0; i < rareCards.length; i ++){
			let rareCard = rareCards[i];
			packs.push({[rareCard]: cards[rareCard]});
		}
		let currentPack = 0;
		let shuffled = shuffleCards(cards);
		Object.keys(shuffled).map((item, key) => {
			if(!rareCards.includes(item)){
				packs[currentPack][item] = cards[item];
			}
			if(packs.hasOwnProperty(currentPack) && Object.keys(packs[currentPack]).length === 5){
				currentPack ++;
			}
		});
    return dispatch({
    	type: types.INIT_PACKS,
      packs: packs
    });
  };
}