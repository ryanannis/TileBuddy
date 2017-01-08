import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import { BoardCellContainer } from './BoardCell';
import {Directions} from '../input_directions.js'
import {Button} from 'react-bootstrap';

export const Search = React.createClass({
  render: function(){
    return(
      <div>
       <Button 
        onClick={e => this.props.executeSearch()}
        bsStyle="primary"
      >
          Search!
        </Button>
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
