import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { BoardCellContainer } from './BoardCell';
import {Directions} from '../input_directions.js'

export const Search = React.createClass({
  render: function(){
    return(
      <div>
        <button className='search' onClick={ e => this.props.executeSearch() } >
          Search!
        </button>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {}
}

export const SearchContainer = connect(
  mapStateToProps,
  actionCreators
)(Search);
