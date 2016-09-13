import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { BoardCellContainer } from './BoardCell';
import {Directions} from '../input_directions.js'

export const WordList = React.createClass({
  render: function(){
    let words = [];
    
    return (
      <div>
        WordListContent
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    wordList: state.getIn(['wordDisplay', 'wordList'])
  }
};

export const WordListContainer = connect(
  mapStateToProps,
  actionCreators
)(WordList);
