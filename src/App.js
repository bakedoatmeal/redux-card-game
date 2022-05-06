import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Game from './Components/Game.js'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { draw, get_deck } from "./actions";

const store = createStore(reducers, applyMiddleware(thunk))

function App() {

  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  );
}

export default App;
