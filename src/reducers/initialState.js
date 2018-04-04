import cards from '../data/cards';
export default {
  stage: 0,
  transition: false,
  bookOpened: false,
  packs: [],
  packCount: Object.keys(cards).length / 5,
  currentPack: 0,
  cards: cards
};