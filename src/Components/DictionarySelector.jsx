import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

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
      <select
        value={this.props.selectedDictionary}
        onChange={e=>this.props.selectDictionary(e.target.value)}>
        {items}
      </select>
    );
  }
});

function mapStateToProps(state){
  console.log(state);
  return {
    dictionaryList: state.getIn(['dictionaries', 'dictionaryList']),
    selectedDictionary: state.getIn(['dictionaries', 'selectedDictionary'])
  }
};

export const DictionarySelectorContainer = connect(
  mapStateToProps,
  actionCreators
)(DictionarySelector);
