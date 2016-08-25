import {Map, List} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import Reducer from './reducer';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {PomodoroContainer} from './Components/Pomodoro';
import reducer from './reducer';
import App from './App';

const defaultState = Map({taskList: List.of(Map({currentTime: 5, duration: 1500})), Started: true, currentTaskIndex: 0});
const store = createStore(reducer, defaultState);

const routes =
<Route component={App}>
  <Route path="/" component={PomodoroContainer} />
</Route>;

ReactDOM.render(
  <Provider store = {store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
