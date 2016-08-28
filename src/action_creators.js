import {Map, List} from 'immutable';
import * as actionTypes from './action_types';


export function set_dictionary(url){
  return {
    type: actionTypes.set_dictionary,
    url
  }
}

export function set_letter(row, col){
  return {
    type: actionTypes.set_letter,
    row,
    col
  }
}

export function set_rack(rack){
  return{
    type: actionTypes.set_rack,
    rack
  }
}
