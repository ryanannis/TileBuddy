import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Rack = React.createClass({
  render: function(){
    return <input
              value={this.props.rackTiles}
            />
  }
});

function mapStateToProps(){
  return {}
};

export const RackContainer = connect(
  mapStateToProps,
  actionCreators
)(Rack);
