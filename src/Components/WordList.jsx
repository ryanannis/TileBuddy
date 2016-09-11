import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { BoardCellContainer } from './BoardCell';
import {Directions} from '../input_directions.js'

export const WordList = React.createClass({
  render: function(){
    return (
      <div>
        WordListContent
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
  }
};

export const WordListContainer = connect(
  mapStateToProps,
  actionCreators
)(WordList);
