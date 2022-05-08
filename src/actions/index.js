export const DRAW_CARD = 'DRAW_CARD'
export const GET_DECK = 'GET_DECK'
export const STAY = 'STAY'
export const START = 'START'

export const get_deck = () => {
  return async(dispatch) => {
    const path =  `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    const res = await fetch(path)
    const json = await res.json()
    const {deck_id} = json
    console.log(deck_id)
  
    dispatch({
      type: GET_DECK, 
      payload: deck_id,
    })
  
  }
}

export const draw = (deck_id, player) => {
  return async (dispatch) => {
    const path = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    const res = await fetch(path)
    const json = await res.json()
    const {cards} = json
    const card = cards[0]

    dispatch({
      type: DRAW_CARD, 
      payload: {card, player}
    })
  }
}

export const stay = () => {
  return {
    type: STAY
  }
}

export const start = () => {
  return {
    type: START
  }
}