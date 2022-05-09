import { DRAW_CARD, GET_DECK, STAND, START, RESTART, CHECK_WINNER } from "../actions"

const defaultState = () => {
  return {
    cards: [], 
    deck_id: '', 
    total_value: 0,
    gameStatus: 'waiting',
    dealer_cards: [],
    dealer_value: 0,
    message: ''
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
          alert('You busted! Game over!')
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
    case STAND:
      return {...state, gameStatus: 'dealer_turn'}
    case START:
      return {...state, gameStatus: 'playing'}
    case RESTART: 
      return {...defaultState()}
    case CHECK_WINNER: 
      let message = ''
      if (state.dealer_value > state.total_value) {
        message = `You have ${state.total_value} and the dealer has ${state.dealer_value} - Dealer wins!`
      } else if (state.dealer_value === state.total_value){
        message = `You have ${state.total_value} and the dealer has ${state.dealer_value} - Standoff!`
      } else {
        message = `You have ${state.total_value} and the dealer has ${state.dealer_value} - You win!`
      }
      return {...state, message: message}
    default:
      return state
  }
}

export default cardsReducer;