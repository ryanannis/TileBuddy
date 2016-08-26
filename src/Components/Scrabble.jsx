import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Board} from './Board'


export const Scrabble = React.createClass({
    componentDidMount: function(){
    },
    render: function(){
      return (
        <div className = "ScrabbleSolver">
          <Board />
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
