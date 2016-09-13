import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BoardCell = React.createClass({
  render: function(){
    let occupation = this.props.letter !== '' ?
                      this.props.letter :
                      'm';
    return (
      <input
        value={this.props.letter}
        onKeyDown={this.props.keyPressHandler}
        className={`${this.props.inputDirection} ${occupation}`}
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
