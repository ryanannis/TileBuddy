import React from 'react';
import ReactDOM from 'react-dom';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {BoardCellContainer} from './BoardCell';
import {Directions} from '../input_directions.js'

export const Board = React.createClass({
    getHoverLetter: function(row, col){
      const shouldHover = this.props.shouldHover;
      const hoverWord = this.props.hoverWord;
      if(shouldHover){
        const word = hoverWord.word;
        if(hoverWord.vertical){
          if(col === hoverWord.row){
            if(row >= hoverWord.row && row - hoverWord.row < word.length){
              return word[row-hoverWord.row];
            }
          }
        }
        else{
          if(row === hoverWord.row){
            if(col >= hoverWord.col && col - hoverWord.col < word.length){
              return word[col-hoverWord.col];
            }
          }
        }
      }
      return '';
      
    },
    handleAlphabeticInput: function(key, r, c){
      this.props.setLetter(key, r, c);
      if(this.props.inputDirection === Directions.RIGHT){
        this.focusCell(r, c + 1);
      }
      if(this.props.inputDirection === Directions.DOWN){
        this.focusCell(r + 1, c);
      }
    },
    handleDeletion: function(r, c){
      this.props.setLetter('', r, c);
      if(this.props.inputDirection === Directions.RIGHT){
        this.focusCell(r, c-1);
      }
      else if(this.props.inputDirection === Directions.DOWN){
        this.focusCell(r-1, c);
      }
    },
    handleArrowMovement: function(key, r, c){
      if(key === 'ArrowLeft'){
        if(this.props.inputDirection === Directions.RIGHT){
          this.focusCell(r, c-1);
        }
        else if(this.props.inputDirection === Directions.DOWN){
          this.props.setInputDirection(Directions.RIGHT);
        }
      }
      else if(key === 'ArrowRight'){
        if(this.props.inputDirection === Directions.RIGHT){
          this.focusCell(r, c+1);
        }
        else if(this.props.inputDirection === Directions.DOWN){
          this.props.setInputDirection(Directions.RIGHT);
        }
      }
      else if(key === 'ArrowUp'){
        if(this.props.inputDirection === Directions.DOWN){
          this.focusCell(r-1, c);
        }
        else if(this.props.inputDirection === Directions.RIGHT){
          this.props.setInputDirection(Directions.DOWN);
        }
      }
      else if(key === 'ArrowDown'){
        if(this.props.inputDirection === Directions.DOWN){
          this.focusCell(r+1, c);
        }
        else if(this.props.inputDirection === Directions.RIGHT){
          this.props.setInputDirection(Directions.DOWN);
        }
      }
    },
    handleBoardInput: function(action, r, c){
      let key = action.key;
      if(key >= 'a' && key <= 'z'){
        this.handleAlphabeticInput(key, r, c);
      }
      else if (key === 'Enter'){
        this.handleAlphabeticInput('', r, c);
      }
      else if(key === 'Backspace' || key === 'Delete'){
        this.handleDeletion(r,c);
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
      const boardFormat = this.props.boardFormat;
      const formatValid = boardFormat && boardFormat.data;
      const colors = formatValid ? boardFormat.data.colors : null;
      const format = formatValid ? boardFormat.data.board: null;
      for(let c = 0; c < 15; c++){
        cells.push(
          <td key = {'d' + c}>
            <BoardCellContainer
              color = { formatValid ? colors[format[c+r*15]] : '#FFF' } //#FFF is default color
              ref = {ref => this.refs[r * 15 + c] = ref}
              key = {r * 15 + c}
              hoverLetter = {this.getHoverLetter(r, c)}
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
        <div className = 'Board'>
          {this.grid()}
       </div>
     );
    }
});

function mapStateToProps(state) {
  return {
    shouldHover: state.getIn(['ui', 'resultsHover']),
    hoverWord: state.getIn(['ui', 'hoverWord']),
    board: state.getIn(['board', 'letterMap']),
    inputDirection: state.getIn(['board', 'inputDirection'])
  }
};

export const BoardContainer = connect(
  mapStateToProps,
  actionCreators
)(Board);
