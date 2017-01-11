import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

const BoardFormatSelector = React.createClass({
  render: function(){
    let boardFormatList = this.props.boardFormatList;
    let items = [];
    for(let key in boardFormatList){
      if(boardFormatList.hasOwnProperty(key)){
        let name = key;
        let url = boardFormatList[key].url;
        items.push(
          <option
            key={name}
            value={url}>
              {name}
          </option>
        ); 
      }
    }
    return(
      <FormGroup controlId="formControlsSelect">
      <ControlLabel>Board Format</ControlLabel>
      <FormControl 
        onChange={e => this.props.selectFormat(e.target.value)}
        value={this.props.selectedFormat}
        componentClass="select" placeholder="select"
      >        
        {items}
      </FormControl>
      </FormGroup>
    );
  }
});

function mapStateToProps(state){
  return {
    boardFormatList: state.getIn(['formats', 'formatList']),
    selectedFormat: state.getIn(['format', 'selectedFormat'])
  }
};

const BoardFormatSelectorContainer = connect(
  mapStateToProps,
  actionCreators
)(BoardFormatSelector);

export default BoardFormatSelectorContainer;
