import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

export const DictionarySelector = React.createClass({
  render: function(){
    let dictionaryList = this.props.dictionaryList;
    let items = [];
    for(let key in dictionaryList){
      if(dictionaryList.hasOwnProperty(key)){
        let name = key;
        let url = dictionaryList[key].url;
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
      <ControlLabel>Dictionary</ControlLabel>
      <FormControl 
        onChange={e => this.props.selectDictionary(e.target.value)}
        value={this.props.selectedDictionary}
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
    dictionaryList: state.getIn(['dictionaries', 'dictionaryList']),
    selectedDictionary: state.getIn(['dictionaries', 'selectedDictionary'])
  }
};

export const DictionarySelectorContainer = connect(
  mapStateToProps,
  actionCreators
)(DictionarySelector);
