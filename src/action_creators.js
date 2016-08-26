import {Map, List} from 'immutable';
import * as actionTypes from './action_types';

export function setDictionary(url){
  return {
    type: actionTypes.SET_DICTIONARY,
    url
  }
}
