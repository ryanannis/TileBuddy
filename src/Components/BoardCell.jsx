import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BoardCell = React.createClass({
  render: function(){
    return (
      <input value={this.props.letter} onKeyDown={this.props.keyPressHandler} />
    );
  }
});
