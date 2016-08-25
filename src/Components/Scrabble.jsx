import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import {TimeDisplayContainer} from './TimeDisplay';
import {TimeControlsContainer} from './TimeControls';
import * as actionCreators from '../action_creators';


export const Pomodoro = React.createClass({
    componentDidMount: function(){
      this.timer = setInterval(this.props.CountDown, 1000);
    },
    render: function(){
      return (
        <div className = "Pomodoro">
          <TimeDisplayContainer />
          <TimeControlsContainer />
       </div>
     );
    }
});

function mapStateToProps(){
  return {}
}

export const PomodoroContainer = connect(
  mapStateToProps,
  actionCreators
)(Pomodoro);
