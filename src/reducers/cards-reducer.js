import { DRAW_CARD, GET_DECK } from "../actions"

const defaultState = () => {
  return {
    cards: [], 
    deck_id: '', 
    total_value: 0,
  }
}

const cardsReducer = (state = defaultState(), action) => {
  switch(action.type) {
    case DRAW_CARD:
      const newValue = state.total_value + action.payload.value
      console.log(newValue)
      console.log(action.payload)
      return {...state, cards: [...state.cards, action.payload], total_value: newValue}
    case GET_DECK:
      console.log("deck_id", action.payload)
      return {...state, deck_id: action.payload}
    default:
      return state
  }
}

export default cardsReducer;