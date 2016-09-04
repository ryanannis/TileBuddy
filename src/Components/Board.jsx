import React from 'react';
import ReactDOM from 'react-dom';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {BoardCellContainer} from './BoardCell';
import {Directions} from '../input_directions.js'

export const Board = React.createClass({
    handleAlphabeticInput: function(key, r, c){
      this.props.setLetter(key, r, c);
      if(this.props.inputDirection === Directions.RIGHT){
        this.focusCell(r, c + 1);
      }
      if(this.props.inputDirection === Directions.DOWN){
        this.focusCell(r + 1, c);
      }
    },
    handleDeletion: function(){
      this.props.setLetter('', r, c);
      if(this.props.inputDirection === Directions.DOWN){
        this.focusCell(r-1, c);
      }
      else if(this.props.inputDirection === Directions.UP){
        this.focusCell(r+1, c);
      }
    },
    handleArrowMovement: function(key, r, c){
      if(key === 'ArrowLeft'){
        if(this.props.inputDirection === Directions.RIGHT){
          this.focusCell(r, c-1);
        }
        else if(this.props.inputDirection === Directions.DOWN){
          this.focusCell(r, c-1);
          this.props.setInputDirection(Directions.RIGHT);
        }
      }
      else if(key === 'ArrowUp'){
        if(this.props.inputDirection === Directions.RIGHT){
          this.focusCell(r-1, c);
          this.props.setInputDirection(Directions.DOWN);
        }
        else if(this.props.inputDirection === Directions.DOWN){
          this.focusCell(r-1, c);
        }
      }
      else if(key === 'ArrowDown'){
        if(this.props.inputDirection === Directions.RIGHT){
          this.props.setInputDirection(Directions.DOWN);
        }
        else if(this.props.inputDirection === Directions.DOWN){
          this.focusCell(r+1, c);
        }
      }
    },
    handleBoardInput: function(action, r, c){
      let key = action.key;
      if(key >= 'a' && key <= 'z'){
        this.handleAlphabeticInput(key, r, c);
      }
      else if(key === 'Backspace' || key === 'Delete'){
        this.handleDeletion();
      }
      if(key === 'ArrowRight' ||
         key === 'ArrowLeft'  ||
         key === 'ArrowDown'  ||
         key === 'ArrowUp'){
           this.handleArrowMovement(key, r, c);
      }
    },
    focusCell: function(r, c){
      if(r > 14 || c > 14 || r < 0 || c < 0)
        return;
      let child = this.refs[r * 15 + c];
      ReactDOM.findDOMNode(child).focus();
    },
    createRow: function(r){
      let cells = [];
      for(let c = 0; c < 15; c++){
        cells.push(
          <td key = {'d' + c}>
            <BoardCellContainer
              ref = {ref => this.refs[r * 15 + c] = ref}
              key = {r * 15 + c}
              letter = {this.props.board[r * 15 + c]}
              keyPressHandler = {(action)=>this.handleBoardInput(action, r, c)}
            />
          </td>
        );
      }
      return <tr key ={'r' + r}>{cells}</tr>
    },
    grid: function(){
      var rows = [];
      for(let r = 0; r < 15; r++){
        rows.push(this.createRow(r));
      }
      return <table><tbody>{rows}</tbody></table>
    },
    render: function(){
      this.refs = Array(15*15);
      return (
        <div className = "Board">
          {this.grid()}
       </div>
     );
    }
});

function mapStateToProps(state) {
  console.log(state.get('board'));
  return {
    board: state.getIn(['board', 'letterMap']),
    inputDirection: state.getIn(['board', 'inputDirection'])
  }
};

export const BoardContainer = connect(
  mapStateToProps,
  actionCreators
)(Board);
