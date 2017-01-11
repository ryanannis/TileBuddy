import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Directions} from '../input_directions.js'

const WordListWord = React.createClass({
  render: function(){
    return (
      <tr onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
        <td> { this.props.word || this.props.hoverLetter } </td>
        <td> { this.props.score } </td>
      </tr>
    );
  }
});

export default WordListWord;