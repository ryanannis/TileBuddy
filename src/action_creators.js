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

export function selectFormat(name){
  return {
    type: actionTypes.select_format,
    name
  }
}

function requestFormat(name){
  return {
    type: actionTypes.fetch_format_request,
    name
  }
}

function requestDictionary(name){
  return {
    type: actionTypes.fetch_dictionary_request,
    name
  }
}

function failRecievingDictionary(url){
  return {
    type: actionTypes.fetch_dictionary_failure,
    url
  }
}

export function setHoverWord(word, row, col, vertical){
  return{
    type: actionTypes.set_hover_word,
    word,
    row,
    col,
    vertical
  }
}

export function unsetHoverWord(word, row, col, vertical){
  return{
    type: actionTypes.unset_hover_word,
  }
}

export function loadFormatIfNeeded(name, callback){
  return (dispatch, getState) => {
    const state = getState();
    let format = getState().getIn(['formats', 'formatList'])[name];
    let url = format.url;

    /* Dictionary has already been loaded */
    if(format.isFetching || format.data){
      callback();
      return;
    }

    /* Load the dictionary and execute the callback */
    else{
      const state = getState();
      dispatch(requestFormat(name));
      fetch(url)
         .then(response => response.json())
         .then(data => {
           dispatch({
            type: actionTypes.fetch_format_success,
            name,
            data,
           });
         })
         .catch(err => console.log(err))
    }
  }
}

export function loadDictionaryIfNeeded(name, url, callback){
  return (dispatch, getState) => {
    const state = getState();
    let dictionary = getState().getIn(['dictionaries', 'dictionaryList'])[name];

    /* Dictionary has already been loaded */
    if(dictionary.isFetching || dictionary.rootNode){
      callback();
      return;
    }
    /* Load the dictionary and execute the callback */
    else{
      const state = getState();
      dispatch(requestDictionary(name));
      fetch(url)
         .then(response => response.text())
         .then(text => {
           let rootNode = new Trie();
           for(let word of text.split('\n')){
              if(word){
                rootNode.addWord(word.toLowerCase());
              }
           }
           dispatch({
            type: actionTypes.fetch_dictionary_success,
            name,
            rootNode
           });
           callback();
         })
         .catch(err => console.log(err))
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
