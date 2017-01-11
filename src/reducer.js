import {Map, List, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutable';
import * as actionTypes from './action_types';
import {Directions} from './input_directions';
import solveBoard from './algo/ScrabbleSolver';

let defaultBoardState = Array(15*15).fill('');

let FORMATLIST ={
  'Scrabble': {
    url: './static/boardFormats/scrabble.json',
    fetching: false
}};

let DICTIONARYLIST ={
  'SOWPODS': {
    url: './static/wordlists/SOWPODS.txt',
    fetching: false
}};

/* Be careful here, state is global state, NOT just wordDisplay
 * because this part of the reducer has dependencies on other
 * parts of the reducer. */
function wordDisplay(state, action){
  const wordDisplayState = state.get('wordDisplay') ;
  switch(action.type){
    case actionTypes.execute_search: {
      let selectedDictionaryName = state.getIn(['dictionaries', 'selectedDictionary']);
      let rootNode = state.getIn(['dictionaries', 'dictionaryList'])[selectedDictionaryName].rootNode;
      
      let board = state.getIn(['board', 'letterMap']);
      let stateRack = state.get('rack').get('tiles');

      let rack = stateRack.filter(e => e !== '');
      
      const wordList = solveBoard(rootNode, board, rack);
      return wordDisplayState ? wordDisplayState.set('wordList', wordList) : Map({wordList: wordList});
    }
  }

  return wordDisplayState || Map({});
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
      
      let clonedDictionaryList = JSON.parse(JSON.stringify(dictionaryList));
      clonedDictionaryList[action.name].rootNode = action.rootNode; 
      clonedDictionaryList[action.name].fetching = false; 

      return state.set('dictionaryList', clonedDictionaryList);
    case actionTypes.fetch_dictionary_request:
      /* Prevent double-loading the dictionary */
      let _dictionaryList = state.get('dictionaryList');
      let _clonedDictionaryList = JSON.parse(JSON.stringify(_dictionaryList));
      console.log(action);
      _clonedDictionaryList[action.name].fetching = true; 

      return state.set('dictionaryList', _clonedDictionaryList);
    case actionTypes.fetch_dictionary_failure:
      return state; //Visual display only, TODO
  }
  return state;
}

function formats(state = Map({
  formatList: FORMATLIST,
  selectedFormat: 'Scrabble'
}), action){
  switch(action.type){
    case actionTypes.select_format:
      return state.set(selectedDictionary, action.dictionaryName);
    case actionTypes.fetch_format_success:
      let formatList = state.get('formatList');
      
      let formatListClone = JSON.parse(JSON.stringify(formatList));
      formatListClone[action.name].data = action.data; 
      formatListClone[action.name].fetching = false; 

      return state.set('formatList', formatListClone);

    case actionTypes.fetch_format_request:
      /* Prevent double-loading the dictionary */
      let _formatList = state.get('formatList');
      let _clonedFormatList = JSON.parse(JSON.stringify(_formatList));
      _clonedFormatList[action.name].fetching = true; 

       return state.set('formatList', _clonedFormatList);
  }
  return state;
}

function ui(
  state = Map({resultsHover: false}),
  action
){
  switch(action.type){
    case actionTypes.set_hover_word: {
      return state.set(
        'hoverWord', 
        {word: action.word, row:action.row, col: action.col, vertical: action.vertical}
      ).set('resultsHover', true);
    }
    case actionTypes.unset_hover_word: {
      return state.set('resultsHover', false);
    }
  }
  return state;
}

/* We don't use default combineReducers since wordDisplay is not independent and needs entire state.*/
export default function reducer(state = Map({}), action){
  return(Map({
       ui: ui(state.get('ui'), action),
       board: board(state.get('board'), action),
       rack: rack(state.get('rack'), action),
       dictionaries: dictionaries(state.get('dictionaries'), action),
       formats: formats(state.get('formats'), action),        
       wordDisplay: wordDisplay(state, action)
  }))
}