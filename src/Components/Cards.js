import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { draw, get_deck } from "../actions";
import { useEffect } from "react";

const Cards = () => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards.cards)
  const deck_id = useSelector(state => state.cards.deck_id)
  const value = useSelector(state => state.cards.total_value)
  const gameStatus = useSelector(state => state.cards.gameStatus)
  const dealer_cards = useSelector(state => state.cards.dealer_cards)
  const dealer_value = useSelector(state => state.cards.dealer_value)

  const cardsDisplay = cards.map((card) => {
    return(
      <img src={card.image}/>
    )
  })

  const dealerCards = dealer_cards.map((card) => {
    return(
      <img src={card.image}/>
    )
  })

  return (
    <div>
      <div className='game-display'>
        <h1>Your cards: {value}</h1>
        {cardsDisplay}
        <p>Dealer cards: {dealer_value}</p>
        {dealerCards}
      </div>
      <button
        onClick={() => {
         dispatch(draw(deck_id, 'player'))

         // delay a function call by a given amount of milliseconds
         const delay = (time) => {
          return new Promise(resolve => setTimeout(resolve, time))
         }

         // draw a card for the dealer one second after the card for the player
         delay(1000).then(() => dispatch(draw(deck_id, 'dealer')))

        }
        }
        disabled={gameStatus === 'over'}
        >
          Hit (draw a card)
      </button>
      <button
      disabled={gameStatus === 'over'}>
        Stand
      </button>
    </div>
  )

}

export default Cards;