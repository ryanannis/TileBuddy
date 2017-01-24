/* See https://www.cs.cmu.edu/afs/cs/academic/class/15451-s06/www/lectures/scrabble.pdf for
 * more details on the algorithm.*/

function solveBoard(trieRoot, board, rack, tileValues){
  let boardEmpty = board.every((item) => item === '');
  let crossCheck = Array(255);
  let anchors = Array(255);
  let wordList = [];
  let horizontal = true;
  /* Rotates the board, used because we compute horizontal words
   * and vertical words in the same fashion */
  function rotate(){
    let newBoard = Array(255);
    newBoard.fill('');
    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        newBoard[c* 15 + r] = board[r * 15 + c];
      }
    }
    board = newBoard;
  }

  function addWord(r, c, word){
    wordList.push({word, row: r, col: c});
  }

  /* Cross checks must be generated before running this */
  function computeAnchors(){
    // Set center tile to anchor if board is empty
    if(boardEmpty){
      anchors[7 * 15 + 7] = true;
      return;
    }
    anchors.fill(false);
    for(let r = 0; r < 15; r++){
      let isThereTileLeftmost = board[r * 15] !== '';

      for(let c = 0; c < 15; c++){
        if(board[r * 15 + c] === ''){ /* Only blank tiles can be anchors */
            if( c === 0 || board[r * 15  + (c - 1)] === ''){ /*There is no tile to the left */
            
            /* Any Cross Check that doesn't have a tile to the left is an Anchor */
            if(crossCheck[r * 15 + c].length > 0){
                anchors[r * 15 + c] = true;
                continue;
            }

            /*There is tile to the right */
            if( c < 14 && board[r * 15  + (c + 1)] !== ''){ 
              anchors[r * 15 + c] = true;
              continue;
            }
          }

        /* Only time that a space with a tile to the left can be an
         * anchor is all the left spaces to the edge of the board
         * is filled */
        if(isThereTileLeftmost){
              anchors[r * 15] = true;
              isThereTileLeftmost = false;
              continue;
            }
        }
      }
    }
  }

  function isSquareAnchor(r, c){
    if(anchors[r * 15 + c]){
      console.log('anchor: ', 'r:', r, 'c:', c);
    }
    return anchors[r * 15 + c];
  }

  /* Returns true if a whole word is in the Trie */
  function isWordValid(word){
    let node = trieRoot;
    for(const letter of word){
      node = node.advance(letter);
      if(!node)
        return false;
    }

    if(node.isTerminal()){
      return true;
    }
    return false;
  }

  function addCrossCheck(r, c, preWord, postWord){
    let validLetters = [];
    if(preWord.length > 0 || postWord.length > 0){
      for(const tile of rack){
        const word = preWord + tile + postWord;
        if(isWordValid(word)){
          validLetters.push(tile);
        }
      }
    }
    crossCheck[r * 15 + c] = validLetters;
  }

  function computeCrossChecks(){
    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        /* The vertical part of the word above the letter */
        let preWord = [];

        /* The vertical part of the word below the letter */
        let postWord = [];
 
        for(let q = r - 1; q >= 0; q--){
          let tile = board[q * 15 + c];
          if(tile === '')
            break;
          preWord.push(tile);
        }

        for(let q = r + 1; q < 15; q++){
          let tile = board[q * 15 +c];
          if(tile === '')
            break;
          postWord.push(tile);
        }

        preWord.reverse();
        addCrossCheck(r, c, preWord, postWord);
      }
    }
  }

  /* Finds the farthest left a word containing the tile at 
    * square (r,c) can be extended */
  function getLeftLimit(r, c){
    let limit = 0 ; /* We can always use the anchor square so limit is always at least 1*/
    
    /* Special case for when tiles are filled to the left side of the board */ 
    if(board[r][c] !== ''){
      return 0;
    }
    
    while(c >= 0){
      if(board[r * 15 + c] === '' && crossCheck[r * 15 + c].length === 0){
        c--;
        limit++;
      }
      else{
        break;
      }
    }

    /* If we encounter our last empty square not at the board's edge,
        that means there is tile to the left of it */
    if(r === 0) limit++;
    
    return limit;
  }


  /* Generates all the left prefixes for a word at a square (r,c) 
   * and then extends each one rightwards.  Note that extendRight
   * INCLUDES the anchor square. */
  function leftPrefixes(partialWord, node, limit, r, c){
    extendRight(partialWord, node, r, c);
    if(limit > 0){
      for(let i = 0 ; i < rack.length; i++){
        let tile = rack[i];
        console.log(rack);
        let advance = node.advance(tile);
        if(advance){
          rack.splice(i, 1);
          leftPrefixes(partialWord + tile, advance, limit - 1, r, c);
          rack.splice(i, 0, tile);
        }
      }
    }
  }

  function extendRight(partialWord, node, r, c){
    if(c > 14) return;
    //console.log('pw:', partialWord);
    //console.log('r:', r);
    //console.log('c:', c);
    if(node.isTerminal() && board[r * 15 + c] === ''){
      addWord(r, c - partialWord.length, partialWord);
    }

    if(board[r * 15 + c] === ''){
      /* Special handling for end of board */
      if(node.isTerminal() && (c === 14 || board[r * 15 + c + 1] === ' ')){
        addWord(r, c - partialWord.length + 1, partialWord);
      }
      for(let i = 0 ; i < rack.length; i++){
        let tile = rack[i];
        let advance = node.advance(tile);

        if(advance && ( ( crossCheck[r * 15 + c].length === 0) || crossCheck[r * 15 + c].indexOf(tile) !== -1)){
          /* Remove the tile from the rack */
          rack.splice(i, 1);
          
          /* Find all right prefixes */
          if(!advance.isTerminal){
            console.log(advance);
          }
          extendRight(partialWord + tile, advance, r, c+1);

          /* Put tile back */
          rack.splice(i, 0, tile);
        }
      }
    }
    else{
      let tile = board[r * 15 + c];
      let advance = node.advance(tile)
      if(advance){
        extendRight(partialWord + tile, advance, r, c+1);
      }
    }
  }

  function findWord(r,c){
    /* We only begin search at 'anchor' squares */
    if(isSquareAnchor(r,c)){
      let limit = getLeftLimit(r,c);
      leftPrefixes('', trieRoot, limit, r, c);
    }
  }

  /* Finds all words with the board's current orientation */
  function findAllWords(){
    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        findWord(r,c);
      }
    }
  }

  function exec(){
    computeCrossChecks();
    computeAnchors();
    findAllWords();
  }
  
  exec();
  console.log(wordList);
  return wordList;
};

export default solveBoard;
