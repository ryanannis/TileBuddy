import fetch from 'isomorphic-fetch';
import {Map, List} from 'immutable';
import * as actionTypes from './action_types';

export function loadDictionaryIfNeeded(url){
  return (dispatch, store) =>
}

export function setLetter(letter, row, col){
  return {
    type: actionTypes.set_letter,
    letter,
    row,
    col
  }
}

export function setRack(rack){
  return{
    type: actionTypes.set_rack,
    rack
  }
}

export function setInputDirection(direction){
  return{
    type: actionTypes.set_input_direction,
    direction
  }
}
