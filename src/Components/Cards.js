import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { draw, get_deck, start, stand, check_winner } from "../actions";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import flipInX from "react-animations/lib/flip-in-x";

// set up animation component 
const FlipInXAnimation = keyframes`${flipInX}`
const FlipInXDiv = styled.div
  `animation: 0.7s ${FlipInXAnimation}`

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
      <FlipInXDiv className='card-image'>
        <img src={card.image}/>
      </FlipInXDiv>
    )
  })

  const dealerCards = dealer_cards.map((card, index) => {
    if (index === 1 && gameStatus === 'playing') {
      return(
        <FlipInXDiv className='card-image'>
          <img alt='card-back' src='https://github.com/crobertsbmw/deckofcards/blob/master/static/img/back.png?raw=true'/>
        </FlipInXDiv>
      )
    }
    return(
      <FlipInXDiv className='card-image'>
        <img src={card.image}/>
      </FlipInXDiv>
    )
  })


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
    <div>
      <div className='game-display'>
        <h2>Your cards: {value}</h2>
        <div className='hand-display'>
          {cardsDisplay}
        </div>
        <p>Dealer cards:</p>
        <div className='hand-display dealer'>
          {dealerCards}
        </div>
      </div>
      <div className='btn-display'>
        <button
          onClick={() => {

          if (gameStatus === 'waiting') {
            dispatch(start())
            dispatch(draw(deck_id, 'player'))
            // draw a card for the dealer one second after the card for the player
            delay(500).then(() => dispatch(draw(deck_id, 'dealer')))
            delay(1500).then(() => dispatch(draw(deck_id, 'player')))
            delay(2000).then(() => dispatch(draw(deck_id, 'dealer')))
            return
          }

          dispatch(draw(deck_id, 'player'))
          }
          }
          disabled={gameStatus !== 'playing' && gameStatus !== 'waiting'}
          >
            Hit (draw a card)
        </button>
        <button
        onClick={() => {
          dispatch(stand())
        }}
        disabled={gameStatus !== 'playing'}>
          Stand
        </button>
      </div>
    </div>
  )

}

export default Cards;