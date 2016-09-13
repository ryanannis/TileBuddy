import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {BoardContainer} from './Board';
import {Directions} from '../input_directions.js';
import {RackContainer} from './Rack';
import {DictionarySelectorContainer} from './DictionarySelector';
import {WordListContainer} from './WordList';
import {SearchContainer} from './Search';

export const Scrabble = React.createClass({
    render: function(){
      return (
        <div className = 'ScrabbleSolver'>
          <DictionarySelectorContainer />
          <BoardContainer />
          <RackContainer />
          <WordListContainer />
          <SearchContainer />
       </div>
     );
    }
});

function mapStateToProps(){
  return {}
}

export const ScrabbleContainer = connect(
  mapStateToProps,
  actionCreators
)(Scrabble);
