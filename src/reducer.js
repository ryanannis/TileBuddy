import {Map, List, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutable';
import * as actionTypes from './action_types';
import {Directions} from './input_directions';
import solveBoard from './algo/ScrabbleSolver';

let defaultBoardState = Array(15*15).fill('');

let DICTIONARYLIST ={
  'SOWPODS': {
    url: './static/wordlists/SOWPODS.txt',
    fetching: false
}};

/* Be careful here, state is global state, NOT just wordDisplay
 * because this part of the reducer has dependencies on other
 * parts of the reducer. */
function wordDisplay(state, action){
  switch(action.type){
    case actionTypes.execute_search: {
      let selectedDictionaryName = state.getIn(['dictionaries', 'selectedDictionary']);
      let rootNode = state.getIn(['dictionaries', 'dictionaryList'])[selectedDictionaryName].rootNode;
      
      let board = state.getIn(['board', 'letterMap']);
      let stateRack = state.get('rack').get('tiles');

      let rack = stateRack.filter(e => e !== '');

      state.setIn(['wordDisplay', 'wordList'], solveBoard(rootNode, board, rack));
    }
  }

  return state.wordDisplay ? state.wordDisplay : Map({});
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
  dictionaryList: DICTIONARYLIST,
  selectedDictionary: 'SOWPODS'
}), action){
  switch(action.type){
    case actionTypes.select_dictionary:
      return state.set(selectedDictionary, action.dictionaryName);
    case actionTypes.fetch_dictionary_success:
      let dictionaryList = state.get('dictionaryList');
      
      /* don't mix immutablejs with plain js boys😢.*/
      let clonedDictionaryList = JSON.parse(JSON.stringify(dictionaryList));
      clonedDictionaryList[action.name].rootNode = action.rootNode; 

      return state.set('dictionaryList', clonedDictionaryList);
    case actionTypes.fetch_dictionary_request:
      return state; //Visual display, TODO
    case actionTypes.fetch_dictionary_failure:
      return state; //Visual display only, TODO
  }
  return state;
}

/* We don't use default combineReducers since wordDisplay is not independent and needs entire state.*/
export default function reducer(state = Map({}), action){
  return(Map({
       board: board(state.get('board'), action),
       rack: rack(state.get('rack'), action),
       dictionaries: dictionaries(state.get('dictionaries'), action),
       wordDisplay: wordDisplay(state, action)
  }))
}