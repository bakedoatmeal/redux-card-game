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
    dispatch(get_deck())
  }, [])

  return (
    <>
      <p>Deck ID: {id}</p>
      <Cards></Cards>
    </>
  )
}

export default Game;