import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { BoardCellContainer } from './BoardCell';
import {Directions} from '../input_directions.js'
import WordListWord from './WordListWord';
import {Table} from 'react-bootstrap';

const WordList = React.createClass({
  render: function(){
    const sortedWordList = this.props.wordList.slice(0);
    sortedWordList.sort((a,b) => b.score - a.score);
    console.log(sortedWordList);
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
          {
            this.props.boardValid ? sortedWordList.map(
              (word, idx) => 
                <WordListWord
                  lol={console.log(word)}
                  key={idx}
                  word={word.word}
                  vertical={word.vertical}
                  score={word.score}
                  onMouseEnter={() => this.props.setHoverWord(word.word, word.row, word.col, word.vertical)}
                  onMouseLeave={() => this.props.unsetHoverWord()}
                />
              ) : null
          }
          {!this.props.wordList || !this.props.boardValid || this.props.wordList.length === 0 ?
            <tr><td colSpan="2">No Results</td></tr> : null
          }
        </tbody>
      </Table>
    );
  }
});

function mapStateToProps(state) {
  return {
    wordList: state.getIn(['wordDisplay', 'wordList']) || [],
    boardValid: state.getIn(['board', 'boardValid']),
  }
};

export const WordListContainer = connect(
  mapStateToProps,
  actionCreators
)(WordList);
