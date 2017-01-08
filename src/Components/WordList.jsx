import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { BoardCellContainer } from './BoardCell';
import {Directions} from '../input_directions.js'
import {WordListWord} from './WordListWord';
import {Table} from 'react-bootstrap';

const WordList = React.createClass({
  render: function(){
    let words = [];
    return (
      <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Word</th>
          <th>Points</th>
        </tr>
      </thead>
        <tbody>
          {this.props.wordList.map(word => <WordListWord word={word.word} score={0} />)}
          {!this.props.wordList || this.props.wordList.length === 0 ?
            <tr><td colSpan="2">No Results</td></tr> : null
          }
        </tbody>
      </Table>
    );
  }
});

function mapStateToProps(state) {
  console.log(state);
  return {
    wordList: state.getIn(['wordDisplay', 'wordList']) || []
  }
};

export const WordListContainer = connect(
  mapStateToProps,
  actionCreators
)(WordList);
