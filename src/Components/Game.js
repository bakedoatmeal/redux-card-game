import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { draw, get_deck } from "../actions";
import { useEffect } from "react";
import Cards from "./Cards";

const Game  = () => {
  const dispatch = useDispatch()
  const id = useSelector(state => state.cards.deck_id)

  useEffect(() => {
    console.log('starting up')
    console.log(id)
    dispatch(get_deck())
  }, [])

  return (
    <>
      <h1>Blackjack</h1>
      <Cards></Cards>
    </>
  )
}

export default Game;