import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Directions} from '../input_directions.js'

export const WordListWord = React.createClass({
  render: function(){
    return (
      <tr>
        <td> { this.props.word } </td>
        <td> { this.props.score } </td>
      </tr>
    );
  }
});
