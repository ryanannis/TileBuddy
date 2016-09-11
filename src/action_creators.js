import fetch from 'isomorphic-fetch';
import {Map, List} from 'immutable';
import * as actionTypes from './action_types';
import {TrieNode} from './algo/Trie'

function executeSearch(){
  return {
    type: actionTypes.execute_search
  }
}

function selectDictionary(name){
  return {
    type: actionTypes.select_dictionary,
    name
  }
}

function requestDictionary(url){
  return {
    type: actionTypes.fetch_dictionary_request,
    url
  }
}

function recieveDictionary(url, dictionaryWrapper){
  let root = trie;
  /* TODO:  If this causes performance problems with memory then
   * maybe we can somehow do buffered streaming?*/
  for(word of dictionaryWrapper.dictionary.split('\n')){
    root.addWord(word);
  }
  return {
    type: actionTypes.fetch_dictionary_success,
    url,
    rootNode
  }
}

function failRecievingDictionary(url){
  return {
    type: actionTypes.fetch_dictionary_failure,
    url
  }
}

function loadDictionary(url){
  return (dispatch) => {
    const state = getState();
    dispatch(requestDictionary(url));
    return fetch(url)
      .then(text => dispatch(recieveDictionary(url, text)))
      .catch((err) => dispatch(failRecievingDictionary(url)))
  }
}

export function loadDictionaryIfNeeded(url){
  return (dispatch, getState) => {
    const state = getState();
    if(!state.getIn(['dictionaries', url]) ||
       !state.getIn(['dictionaries', url, 'isFetching'])){
         return dispatch(loadDictionary(url));
    }
  }
}

export function setLetter(letter, row, col){
  return {
    type: actionTypes.set_letter,
    letter,
    row,
    col
  }
}

export function setRack(tiles){
  return{
    type: actionTypes.set_rack,
    tiles
  }
}

export function setInputDirection(direction){
  return{
    type: actionTypes.set_input_direction,
    direction
  }
}
