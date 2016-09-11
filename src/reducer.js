import {Map, List, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutable';
import * as actionTypes from './action_types';
import {Directions} from './input_directions'

let defaultBoardState = Array(15*15).fill('');

let DictionaryList ={
  'SOWPODS': {
    url: './wordlists/SOWPODS.txt',
    loading: false
}};

function wordDisplay(state = fromJS({}), action){
  switch(action.type){
    case actionTypes.execute_search: {
      let rootNode = c
    }
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
      return newState;
    }
    case actionTypes.set_input_direction:
      return state.set('inputDirection', action.direction);
  }
  return state;
}

function rack(state = Map({
  tiles: ['','','','','','','']
}), action){
  switch(action.type){
    case actionTypes.set_rack:
      return state.set('tiles', action.tiles);
  }
  return state;
}

function dictionaries(state = Map({
  dictionaryList: DictionaryList,
  selectedDictionary: 'SOWPODS'
}), action){
  switch(action.type){
    case actionTypes.select_dictionary:
      return state.set(selectedDictionary, action.dictionaryName);
    case actionTypes.fetch_dictionary_success:
      return state.setIn(['dictionaryList', action.name], {
        url: state.getIn['dictionaryList', action.name, 'url'],
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
    dictionaries,
    rack
})
