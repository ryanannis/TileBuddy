import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Board} from './Board'

export const Scrabble = React.createClass({
    getInitialState: function(){
      let board = Array(15*15);
      board.fill('');
      return {board, inputDirection: right}
    },
    updateBoard: function(newLetter, r, c){
      let boardCopy = this.state.board.slice();
      boardCopy[r * 15 + c] = newLetter;
      this.setState({board: boardCopy});
    },
    changeInputDirection: function(direction){

    }
    componentDidMount: function(){
    },
    render: function(){
      return (
        <div className = 'ScrabbleSolver'>
          <Board inputDirection={this.state.inputDirection} ref={ref=>console.log(ref)} updateBoard={this.updateBoard} board ={this.state.board} />
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
