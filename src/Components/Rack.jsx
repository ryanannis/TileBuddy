import React from 'react';
import ReactDOM from 'react-dom';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {LetterBlockContainer} from './LetterBlock'

export const Rack = React.createClass({
  handleRackInput: function(key, r){
    if(key >= 'a' && key <= 'z'){
      this.addTile(key, r);
    }
    else if(key === 'Backspace' || key === 'Delete'){
      this.removeTile(r);
    }
    else if(key === 'ArrowLeft'){
      this.focusCell(r-1);
    }
    else if(key === 'ArrowRight'){
      this.focusCell(r+1);
    }
  },
  focusCell: function(i){
    if(i > 6 || i < 0)
     return;
    let child = this.refs[i];
    this.forceUpdate();
    if(child)
    ReactDOM.findDOMNode(child).focus();
  },

  /* This is technically bad practice in Redux but we handle focus
   * in this class so it can't be helped */
  addTile: function(key, r){
    let tileList = this.props.rackTiles.slice(0);
    tileList.splice(r, 0, key);
    tileList.pop();
    this.props.setRack(tileList);
    this.focusCell(r+1);
  },
  removeTile: function(r){
    let tileList = this.props.rackTiles.slice(0);
    tileList.splice(r, 1);
    tileList.push('');
    console.log(tileList);
    this.focusCell(r-1);
    this.props.setRack(tileList);
  },
  render: function(){
    this.refs = new Array(7);
    let letterBlocks = [];
    for(let i = 0; i < 7; i++){
      let letter = letterBlocks[i];
      letterBlocks.push(
        <LetterBlockContainer
          key={i}
          letter={this.props.rackTiles[i]}
          handleRackInput={this.handleRackInput}
          i={i}
          ref={ref=>this.refs[i] = ref}>
        </LetterBlockContainer>
      );
      if(this.props.rackTiles[i] === '') break;
    }
    return(
      <div className="rack">
        {letterBlocks}
      </div>
    )
  }
});

function mapStateToProps(state){
  return {
    rackTiles: state.getIn(['rack', 'tiles'])
  }
};

export const RackContainer = connect(
  mapStateToProps,
  actionCreators
)(Rack);
