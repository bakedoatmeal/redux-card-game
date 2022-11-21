import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { draw, check_winner } from "../actions";
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
      <div className='card-image'>
        <img className="playingCard" src={card.image}/>
      </div>
    )
  })

  const dealerCards = dealer_cards.map((card, index) => {
    if (index === 1 && gameStatus === 'playing') {
      return(
        <div className='card-image'>
          <img className="playingCard" alt='card-back' src='https://github.com/crobertsbmw/deckofcards/blob/master/static/img/back.png?raw=true'/>
        </div>
      )
    }
    return(
      <div className='card-image'>
        <img className="playingCard" src={card.image}/>
      </div>
    )
  })

  console.log(dealerCards)
  // delay a function call by a given amount of milliseconds
  const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  useEffect(() => {
    console.log(gameStatus)
    if (gameStatus === 'dealer_turn') {
      console.log(dealer_value)
      if (dealer_value < 17) {
        console.log('drawing dealer card')
        delay(1000).then(() => dispatch(draw(deck_id, 'dealer')))
      } else {
        dispatch(check_winner())
      }
    } 
  }, [gameStatus, dealer_value])


  return (
    <>
    <div className='board-1'></div>
      <div className='game-display'>
        <h2>Your cards: {value}</h2>
        <div className='hand-display'>
          {cardsDisplay}
        </div>
        <h2>Dealer cards:</h2>
        <div className='hand-display dealer'>
          {dealerCards}
        </div>
      </div>
    </>
  )

}

export default Cards;