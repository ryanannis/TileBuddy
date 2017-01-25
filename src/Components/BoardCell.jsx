import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BoardCell = React.createClass({
  render: function(){
    let occupied = (this.props.letter || this.props.hoverLetter) ? 'occupied' : '';
    let showcase = this.props.hoverLetter ? 'showcase' : '';
    const style =  this.props.color ? {background: this.props.color} : null;
    return (
      <input
        style={style}
        value={this.props.letter || this.props.hoverLetter }
        onKeyDown={this.props.keyPressHandler}
        className={`${this.props.inputDirection} ${occupied} ${showcase}`}
      />
    );
  }
});

function mapStateToProps(state){
  return {
    inputDirection: state.getIn(['board', 'inputDirection'])
  }
};

export const BoardCellContainer = connect(
  mapStateToProps,
  actionCreators
)(BoardCell);
