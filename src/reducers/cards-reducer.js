import { DRAW_CARD, GET_DECK } from "../actions"

const defaultState = () => {
  return {
    cards: [], 
    deck_id: '', 
    total_value: 0,
    gameStatus: 'playing',
  }
}

const cardsReducer = (state = defaultState(), action) => {
  switch(action.type) {
    case DRAW_CARD:

      let newValue = 0
      if (action.payload.value === 'ACE'){
        newValue = 1
      } else if (action.payload.value === 'QUEEN') {
        newValue = 12
      } else if (action.payload.value === 'KING'){
        newValue = 13
      } else if (action.payload.value === 'JACK') {
        newValue = 11
      } else {
        newValue = parseInt(action.payload.value)
      }
      newValue = state.total_value + newValue

      if (newValue > 21) {
        alert('Game over!')
        return {...state, cards: [...state.cards, action.payload], total_value: newValue, gameStatus: 'over'}
      }

      return {...state, cards: [...state.cards, action.payload], total_value: newValue}
    case GET_DECK:
      console.log("deck_id", action.payload)
      return {...state, deck_id: action.payload}
    default:
      return state
  }
}

export default cardsReducer;