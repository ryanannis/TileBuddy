import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BoardCell = React.createClass({
  render: function(){
    return (
      var occupaction = ${this.props.letter !== "" ?
                          this.props.letter |
                          'm' + this.props.multiplier };
      <input
        value={this.props.letter}
        onKeyDown={this.props.keyPressHandler}
        className=`${this.props.inputDirection} ${occupation}`
      />
    );
  }
});
