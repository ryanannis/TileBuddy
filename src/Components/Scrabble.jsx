import React from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {BoardContainer} from './Board';
import {Directions} from '../input_directions.js';
import {RackContainer} from './Rack';
import {DictionarySelectorContainer} from './DictionarySelector';
import {WordListContainer} from './WordList';
import {SearchContainer} from './Search';
import {PageHeader,Grid,Row,Col} from 'react-bootstrap';
import BoardLayoutSelector from './BoardLayoutSelector';

export const Scrabble = React.createClass({
    componentDidMount(){
      if(!this.props.boardFormat.data){
        this.props.loadFormatIfNeeded(this.props.boardFormatName);
      }
    },
    render: function(boardFormatName){
      return (
        <div className = 'ScrabbleSolver'>
          <Grid>
            <Col md={12}>
            </Col>
            <Col md={7}>
              <div className="padding" />
              <div id="boardContainer">
                <div id="boardDummy"></div>
                <div id="boardElement">
                  <BoardContainer
                    boardFormat={this.props.boardFormat}
                   />
                </div>
              </div>
              <RackContainer />
              <div className="rackTileLabel">Tile Rack</div>
            </Col>
            <Col md={1} />
            <Col md={4}>
              <PageHeader>
                TileBuddy
              </PageHeader>
              <DictionarySelectorContainer /> 
              <BoardLayoutSelector />
              <hr />
              <h4>
                Word List
              </h4>
              <WordListContainer />
              <SearchContainer />
              <div className="footer">
                <hr />
                <small>Tilebuddy &copy; 2017 <a href="https://github.com/minimumcut">Ryan Annis</a> under the MIT License &nbsp;|&nbsp; <a href="https://github.com/minimumcut/Descrabuler"><img src="static/github_sm.png" /></a></small> 
              </div>
            </Col>
          </Grid>
       </div>
     );
    }
});

function mapStateToProps(state){
  const boardFormatName = state.getIn(['formats', 'selectedFormat']);
  return {
    boardFormat: state.getIn(['formats', 'formatList'])[boardFormatName],
    boardFormatName,
  }
}

export const ScrabbleContainer = connect(
  mapStateToProps,
  actionCreators
)(Scrabble);
