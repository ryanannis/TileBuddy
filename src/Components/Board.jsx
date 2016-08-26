import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Board = React.createClass({
    componentDidMount: function(){
    },
    enterLetter: function(){

    },
    createRow: function(r){
      let cells = [];
      for(let c = 0; c < 15; c++){
        cells.push(<input />);
      }
      return <tr>{cells}</tr>
    },
    grid: function(){
      var rows = [];
      for(let r = 0; r < 15; r++){
        rows.push(this.createRow(r));
      }
      return <table> {rows} </table>
    },
    render: function(){
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
