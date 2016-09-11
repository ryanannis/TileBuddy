import fetch from 'isomorphic-fetch';
import {Map, List} from 'immutable';
import * as actionTypes from './action_types';
import {Trie} from './algo/Trie'

export function selectDictionary(name){
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

function recieveDictionary(name, dictionaryPromise){
  let root = new Trie();
  dictionaryPromise.text()
    .then(text => {
      for(let word of text.split('\n')){
        console.log(word);
        root.addWord(word);
      }
       return {
        type: actionTypes.fetch_dictionary_success,
        name,
        rootNode
     }
  });
  /* TODO:  If this causes performance problems with memory then
   * maybe we can somehow do buffered streaming?*/
  console.log(dictionaryWrapper.dictionary);
  
}

function failRecievingDictionary(url){
  return {
    type: actionTypes.fetch_dictionary_failure,
    url
  }
}

function loadDictionary(name, url){
  console.log(url);
  return (dispatch, getState) => {
    const state = getState();
    dispatch(requestDictionary(name));
    //TODO: add visual display for failure
    return fetch(url)
      .then(response => dispatch(recieveDictionary(name, response)))
      .catch(err => console.log(err))
  }
}

export function loadDictionaryIfNeeded(name, url, callback){
  return (dispatch, getState) => {
    const state = getState();
    let dictionary = getState().getIn(['dictionaries', 'dictionaryList'])[name];

    /* Dictionary has already been loaded */
    if(dictionary.isFetching || dictionary.rootNode){
      callback();
    }
    /* Load the dictionary and execute the callback */
    else{
      loadDictionary(name, url)(dispatch, getState).then(callback());
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

export function executeSearch(){
  return (dispatch, getState) => {
    let activeDictionaryName = getState().getIn(['dictionaries', 'selectedDictionary']);
    let activeDictionaryURL = getState().getIn(['dictionaries', 'dictionaryList'])[activeDictionaryName].url;
    let loadAndExecute = loadDictionaryIfNeeded(activeDictionaryName, activeDictionaryURL, () => dispatch({
        type: actionTypes.execute_search,
    }));
    loadAndExecute(dispatch, getState);
  };
}
