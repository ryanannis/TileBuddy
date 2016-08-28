import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {BoardCell} from './BoardCell';

export const Board = React.createClass({
    componentDidMount: function(){
    },
    handleBoardInput(action, r, c){
      let key = action.key;
      if(key >= 'a' && key <= 'z'){
        this.props.updateBoard(key, r,c);
        if(!this.props.verticalInput && c < 14){
          var child = this.refs[r * 15 + c + 1];
          child.getDOMNode().focus();
        }
        if(this.props.verticalInput && r < 14){
          var child = this.refs[(r + 1) * 15 + c];
          child.getDOMNode().focus();
        }
      }
      else if(key === 'Backspace' || key === 'Delete'){
        this.props.updateBoard('', r, c);
      }
    },
    createRow: function(r){
      let cells = [];
      for(let c = 0; c < 15; c++){
        cells.push(
          <td key = {'d' + c}>
            <BoardCell
              ref = {ref => this.refs[r * 15 + c] = ref}
              key = {r * 15 + c}
              letter = {this.props.board[r*15 + c]}
              inputDirection = {this.props.inputDirection}
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

function mapStateToProps(){
  return {}
};

export const BoardContainer = connect(
  mapStateToProps,
  actionCreators
)(Board);
