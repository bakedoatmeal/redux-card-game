import { combineReducers } from "redux";
import cardsReducer from "./cards-reducer";

export default combineReducers({
  cards: cardsReducer
})