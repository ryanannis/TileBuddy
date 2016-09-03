import {Map, List} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import Reducer from './reducer';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {ScrabbleContainer} from './Components/Scrabble';
import reducer from './reducer';
import App from './App';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

const routes =
<Route component={App}>
  <Route path="/" component={ScrabbleContainer} />
</Route>;

ReactDOM.render(
  <Provider store = {store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
