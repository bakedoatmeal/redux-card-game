import { DRAW_CARD, GET_DECK, STAY, START } from "../actions"

const defaultState = () => {
  return {
    cards: [], 
    deck_id: '', 
    total_value: 0,
    gameStatus: 'waiting',
    dealer_cards: [],
    dealer_value: 0,
  }
}

const cardsReducer = (state = defaultState(), action) => {
  switch(action.type) {
    case DRAW_CARD:

      let {card, player} = action.payload

      let newValue = 0
      if (card.value === 'ACE'){
        newValue = 11
      } else if (card.value === 'QUEEN' || card.value === 'KING' || card.value === 'JACK') {
        newValue = 10
      } else {
        newValue = parseInt(card.value)
      }

      if (player === 'player') {

        newValue = state.total_value + newValue

        if (newValue > 21) {
          alert('Game over!')
          return {...state, cards: [...state.cards, card], total_value: newValue, gameStatus: 'over'}
        }

        return {...state, cards: [...state.cards, card], total_value: newValue}
      } else {
        const newDealerValue = state.dealer_value + newValue
        return {...state, dealer_cards: [...state.dealer_cards, card], dealer_value: newDealerValue}
      }
    case GET_DECK:
      console.log("deck_id", action.payload)
      return {...state, deck_id: action.payload}
    case STAY:
      if (state.dealer_value > state.value) {
        console.log('dealer wins!')
      } else {
        console.log('you win!')
      }
      return state
    case START:
      return {...state, gameStatus: 'playing'}
    default:
      return state
  }
}

export default cardsReducer;