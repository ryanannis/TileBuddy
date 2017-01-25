/* See https://www.cs.cmu.edu/afs/cs/academic/class/15451-s06/www/lectures/scrabble.pdf for
 * more details on the algorithm.*/

function solveBoard(trieRoot, board, rack, tileValues, bonusMap){
  let boardEmpty = board.every((item) => item === '');
  let crossCheck = Array(255);
  let anchors = Array(255);
  let wordList = [];
  let horizontal = true;
  /* Rotates the board, used because we compute horizontal words
   * and vertical words in the same fashion */
  function rotate(){
    horizontal = false;
    let newBoard = Array(255);
    newBoard.fill('');
    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        newBoard[c * 15 + r] = board[r * 15 + c];
      }
    }
    board = newBoard;
  }

  function addWord(r, c, word, numPlaced, anchorCovered){
    if(numPlaced > 0 && anchorCovered){
      const wordValue = calculateWordValue(r, c, word);
      if(horizontal){
        wordList.push({word, vertical: false, row: r, col: c, score: wordValue});
      }
      else{
        wordList.push({word, vertical: true, row: c, col: r, score: wordValue});
      }
    }
  }

   function calculateWordValue(r_0, c_0, word){
     let wordMultiplier = 1;
     let sum = 0;
     let columnSums = 0;
     for(let c = c_0; c < c_0 + word.length; c++){
       const boardTile = board[r_0 * 15  + c];
       /* Tile is already on the board */
       if(boardTile !== ''){
          sum += tileValues[boardTile];
       } else {
        const bonus = bonusMap[r_0 * 15  + c];
        let letterMultiplier = 1;
        let columnWordMultiplier = 1;

        switch(bonus){
          case 'dw':
            columnWordMultiplier = 2;
            break;
          case 'tw':
            columnWordMultiplier = 3;
            break;
          case 'dl':
            letterMultiplier = 2;
            break;
          case 'dl':
            letterMultiplier = 3;
            break;
        }

         /* If the beginning and ending row are the same then we know we didn't form a new word vertically*/
         let beginningRow = r_0;
         let endingRow = r_0;

         let colSum = 0;
         // Scan for start of word upwards
         for(let r = r_0 - 1; r >= 0; r--){
            if(board[r * 15  + c] === ''){
              break;
            }
            colSum += tileValues[board[r * 15  + c]];
            beginningRow = r;
         }
         // Scan downwards for end of word, adding up tile values
         for(let r = r_0 + 1; r < 15; r++){
            if(board[r * 15  + c] === ''){
              break;
            }
            colSum += tileValues[board[r * 15  + c]];
            endingRow = r;
         }

         if(beginningRow !== endingRow){
           columnSums += colSum + letterMultiplier * tileValues[word[c-c_0]];
         }

         wordMultiplier *= columnWordMultiplier;
         sum += colSum + letterMultiplier * tileValues[word[c-c_0]]
       }
     }
     return sum * wordMultiplier + columnSums;
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
      for(let c = 0; c < 15; c++){
        /* All blank tiles with Cross Checks are and no tile to the left are anchors */
        if(board[r * 15 + c] === ''){ 
          if( c === 0 || board[r * 15  + (c - 1)] === ''){ /*There is no tile to the left */    
            /* Any Cross Check that doesn't have a tile to the left is an Anchor */
            if(crossCheck[r * 15 + c].length > 0){
                anchors[r * 15 + c] = true;
                continue;
            }
          }
        }

        /* All non-blank tiles with no tile to the left are anchors */
        if(board[r * 15 + c] !== ''){
          if( c === 0 || board[r * 15  + (c - 1)] === ''){ /*There is no tile to the left */
              anchors[r * 15 + c] = true;
              continue;
          }
        }
      }
    }
  }

  function isSquareAnchor(r, c){
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
    let limit = 0 ; 
    
    c--;
    
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
  function leftPrefixes(partialWord, node, limit, r, c, numPlaced = 0){
    extendRight(partialWord, node, r, c, numPlaced);
    if(limit > 0){
      for(let i = 0 ; i < rack.length; i++){
        let tile = rack[i];
        let advance = node.advance(tile);
        if(advance){
          rack.splice(i, 1);
          leftPrefixes(partialWord + tile, advance, limit - 1, r, c, numPlaced + 1);
          rack.splice(i, 0, tile);
        }
      }
    }
  }

  function extendRight(partialWord, node, r, c, numPlaced = 0, anchorCovered = false){
    if(c > 14) return;
    if(node.isTerminal() && board[r * 15 + c] === '' && !(r == 7 && c == 7)){
      addWord(r, c - partialWord.length, partialWord, numPlaced, anchorCovered);
    }

    if(board[r * 15 + c] === ''){
      /* Special handling for end of board */
      if(node.isTerminal() && (c === 14 || board[r * 15 + c + 1] === ' ')){
          addWord(r, c - partialWord.length + 1, partialWord, numPlaced, anchorCovered);
      }
      for(let i = 0 ; i < rack.length; i++){
        let tile = rack[i];
        let advance = node.advance(tile);

        if(advance && ( ( crossCheck[r * 15 + c].length === 0) || crossCheck[r * 15 + c].indexOf(tile) !== -1)){
          /* Remove the tile from the rack */
          rack.splice(i, 1);
          
          /* Find all right prefixes */
          if(!advance.isTerminal){
            //console.log(advance);
          }
          extendRight(partialWord + tile, advance, r, c+1, numPlaced + 1, true);

          /* Put tile back */
          rack.splice(i, 0, tile);
        }
      }
    }
    else{
      let tile = board[r * 15 + c];
      let advance = node.advance(tile)
      if(advance){
        extendRight(partialWord + tile, advance, r, c+1, numPlaced, true);
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
  rotate();
  exec();
  return wordList;
};

export default solveBoard;
