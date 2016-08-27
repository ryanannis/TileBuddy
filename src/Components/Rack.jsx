import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Rack = React.createClass({

}


function mapStateToProps(){
  return {}
};

export const BoardContainer = connect(
  mapStateToProps,
  actionCreators
)(Rack);
