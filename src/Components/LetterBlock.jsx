import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const LetterBlock = React.createClass({
  render: function(){
    return(
      <input
        className={"rackTileSlot"}
        type="text"
        autoFocus
        value={this.props.letter}
        onKeyDown={e => this.props.handleRackInput(e.key, this.props.i)}
      />
  )}
});

function mapStateToProps(state){
  return {}
};

export const LetterBlockContainer = connect(
  mapStateToProps,
  actionCreators
)(LetterBlock);
