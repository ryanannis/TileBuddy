import {Map, List, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutable';
import * as actionTypes from './action_types';
import {Directions} from './input_directions'

let defaultBoardState = Array(15*15).fill("");

function wordDisplay(state, action){
  switch(action.type){
    case actionTypes.calculate_results:
      return state;
    case actionTypes.set_input_direction:
      return state;
  }
  return state;
}

function board(state = {
  letterMap: defaultBoardState,
  inputDirection: Directions.RIGHT
}, action){
  switch(action.type){
    case actionTypes.set_letter:
      state.update('letterMap', arr => {
        arr[action.r * 15 + action.c] = action.letter;
        return arr;
      });
  }
  return state;
}

function rack(state, action){
  switch(action.type){
    case actionTypes.set_rack:
      state.set('tiles', action.tiles)
  }
  return state;
}

function dictionary(state, action){
  switch(action.type){
    case actionTypes.fetch_dictionary_success:
      return state.set(action.url, {
        isFetching: false,
        rooteNode: action.rootNode
      });
    case actionTypes.fetch_dictionary_request:
      return state; //Visual display, TODO
    case actionTypes.fetch_dictionary_failure:
      return state; //Visual display only, TODO
  }
  return state;
}

export default function reducer(state = Map(), action){
  return state;
  combineReducers({
    board,
    wordDisplay,
    dictionary,
    rack
  })
}
