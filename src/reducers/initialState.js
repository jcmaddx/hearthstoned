import cards from '../data/cards';
export default {
  stage: 0,
  transition: false,
  packs: [],
  packCount: Object.keys(cards).length / 5,
  cards: cards
};