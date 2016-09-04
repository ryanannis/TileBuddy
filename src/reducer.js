import {Map, List, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutable';
import * as actionTypes from './action_types';
import {Directions} from './input_directions'

let defaultBoardState = Array(15*15).fill("");

function wordDisplay(state = fromJS({}), action){
  switch(action.type){
    case actionTypes.calculate_results:
      return state;
  }
  return state;
}

function board(state = Map({
  letterMap: defaultBoardState,
  inputDirection: Directions.RIGHT
}), action){
  switch(action.type){
    case actionTypes.set_letter: {
      let newState = state.update('letterMap', arr => {
        let newArr = arr.slice();
        newArr[action.row * 15 + action.col] = action.letter;
        return newArr;
      });
      console.log(newState);
      return newState;
    }
    case actionTypes.set_input_direction:
      console.log("gezo was here !!!");
      return state.set("inputDirection", action.direction);
  }
  return state;
}

function rack(state = fromJS({
  tiles: []
}), action){
  switch(action.type){
    case actionTypes.set_rack:
      state.set('tiles', action.tiles)
  }
  return state;
}

function dictonaries(state = fromJS({}), action){
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

export default combineReducers({
    board,
    wordDisplay,
    dictonaries,
    rack
})
