/* See https://www.cs.cmu.edu/afs/cs/academic/class/15451-s06/www/lectures/scrabble.pdf for
 * more details on the algorithm.*/
function solveBoard(trieRoot, board, rack){
  let crossCheck = Array(15);
  let wordList = [];
  let horizontal = true;

  function rotate(){
    let newBoard = Array(15);
    newBoard.fill(Array(15));
    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        newBoard[c][r] = board[r][c];
      }
    }
    board = newBoard;
  }

  function init(){
    crossCheck.fill(Array(15));
  }

  function addWord(r, c, word){
    wordList.push({word, row:c, col: c});
  }

  function isSquareAnchor(r, c){
    if(crossCheck[r][c])
      return true; //Cross checks are always anchors
    if( r < 14 && board[r+1][c] !== ' ')
      return true;
    if( r > 0 && board[r-1][c] !== ' ')
      return true;
    return false;
  }

  /* Returns true if a whole word is in the dictionary */
  function isWordValid(word){
    let node = trieRoot;
    for(letter of word){
      node = node.adv(letter);
      if(!node)
        return false;
    }

    if(node.isTerminal())
      return true;

    return false;
  }

  function addCrossCheck(r, c, preWord, postWord){
    let validLetters = [];
    for(tile of rack){
      if(isWordValid(preWord + tile + postWord)){
        validLetters.push(tile);
      }
    }
  }

  function computeCrossChecks(){
    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        /* The vertical part of the word above the letter */
        let preWord = [];
        /* The vertical part of the word below the letter */
        let postWord = [];
 
        for(let q = r - 1; q >= 0; q--){
          let tile = board[q][c];
          if(tile === ' ')
            break;
          preWord.add(tile);
        }

        for(let q = r + 1; q < 15; q++){
          let tile = board[q][c];
          if(tile === ' ')
            break;
          postWord.add(tile);
        }
        preWord.reverse();
        addCrossCheck(checkRow, c, preWord, postWord);
      }
    }

    /* Finds the farthest left a word containing the tile at 
     * square (r,c) can be extended */
    function getLeftLimit(r, c){
      r = r-1;
      for(let i = 0; r >= 0; i++, r--){
        if(board[r][c] !== ' ' || isSquareAnchor[r][c])
          break;
      }

      /* If we encounter our last empty square not at the board's edge,
         that means there is tile to the left of it */
      if(r !== 0) i--;
      return i;
    }

    function leftPrefixes(partialWord, node, limit, r, c){
      extendRight(partialWord, node, r, c);
      if(limit > 0){
        for(let i = 0 ; i < rack.length; i++){
          let tile = rack[i];
          let adv = node.advance(tile);
          if(adv){
            rack.splice(i, 1);
            leftPrefixes(partialWord + tile, adv, limit - 1);
            rack.push(tile);
          }
        }
      }
    }

    function extendRight(partialWord, node, r, c){
      if(c > 14) return;
      if(board[r][c] === ' '){
        if(isTerminal(node) && (c === 14 || board[r][c+1] === ' ')){
          addWord(r, c - partialWord.length + 1, partialWord);
        }
        for(let i = 0 ; i < rack.length; i++){
          let tile = rack[i];
          let adv = node.advance(tile);
          if(adv && !crossCheck[r][c] || crossCheck[r][c].indexOf(tile) !== -1){
            rack.splice(i, 1);
            extendRight(partialWord + tile, adv, r, c+1);
            rack.push(tile);
          }
        }
      }
      else{
        let tile = board[r][c];
        if(adv){
          extendRight(partialWord + tile, adv, r, c+1);
        }
      }
    }

  }
};

export { solveBoard };
