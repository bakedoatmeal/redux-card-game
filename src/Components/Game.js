import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { draw, get_deck, restart } from "../actions";
import { useEffect } from "react";
import Cards from "./Cards";

const Game  = () => {
  const dispatch = useDispatch()
  const id = useSelector(state => state.cards.deck_id)
  const message = useSelector(state => state.cards.message)

  useEffect(() => {
    console.log('starting up')
    console.log(id)
    dispatch(get_deck())
  }, [])

  return (
    <>
      <h1>♦️♣️ Blackjack ♠️❤️</h1>
      <h2 className='message'>{message !== '' && message}</h2>
      <Cards></Cards>
      <button
        onClick={() => {
        dispatch(restart())
        dispatch(get_deck())
      }}
      >New Game</button>
    </>
  )
}

export default Game;