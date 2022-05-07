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

  const cardsDisplay = cards.map((card) => {
    return(
      <img src={card.image}/>
    )
  })

  return (
    <div>
      <button
        onClick={() => 
         dispatch(draw(deck_id))
        }
        disabled={gameStatus === 'over'}
        >
          Draw Card
      </button>
      {cardsDisplay}
      <h1>{value}</h1>
      
    </div>
  )

}

export default Cards;