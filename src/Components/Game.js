import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { draw, get_deck, restart, start, stand, check_winner } from "../actions";
import { useEffect } from "react";
import Cards from "./Cards";


const Game  = () => {
  const dispatch = useDispatch()
  const id = useSelector(state => state.cards.deck_id)
  const message = useSelector(state => state.cards.message)
  const deck_id = useSelector(state => state.cards.deck_id)
  const gameStatus = useSelector(state => state.cards.gameStatus)
  const dealer_value = useSelector(state => state.cards.dealer_value)

  useEffect(() => {
    console.log('starting up')
    console.log(id)
    dispatch(get_deck())
  }, [])



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
    <div className="game">
      <div className="title">
        <div className="icon">
          <img alt="ace" className="icon1" src="https://github.com/crobertsbmw/deckofcards/blob/master/static/img/AH.png?raw=true"></img>
          <img alt='card-back' className="icon2" src='https://github.com/crobertsbmw/deckofcards/blob/master/static/img/back.png?raw=true'/>
        </div>
        <h1>Blackjack</h1>
      </div>
      <div className="gameBox">
        <div className='btn-display'>
          <button
            onClick={() => {
            dispatch(restart())
            dispatch(get_deck())
          }}
          >New Game</button>
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
          <h2 className='message'>{message !== '' && message}</h2>
          <Cards></Cards>
      </div>
    </div>
  )
}

export default Game;