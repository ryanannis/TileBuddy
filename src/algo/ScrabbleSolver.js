/* Computes all the possible move on a scrabble board, given
 * the root of a trie (a 26ry tree) and a board (a 9x9 array).
 * See https://www.cs.cmu.edu/afs/cs/academic/class/15451-s06/www/lectures/scrabble.pdf for
 * more details.  Note we did not use a dawg because decompression and transmitting
 * over network is more of a concern on a modern web app */
function ScrabbleSolver(trieRoot, board, rack){
  /* 'Class' variables*/
  let crossCheck = Array();
  let rack = Array();
  let wordList = Array();

  function init(){
    for(let i = 0; i < 15; i++) crossCheck[i] = Array(9);
  }

  function addWord(r, c, word){

  }

  function isSquareAnchor(r, c){
    if(crossCheck[r][c])
      return true; //Cross checks are always anchors
    if( r < 14 && board[r+1][c] !== " ")
      return true;
    if( r > 0 && board[r-1][c] !== " ")
      return true;
  }

  function isWordValid(word){
    let node = trieRoot;
    for(letter in word){
      if(!node)
        return false;
      node = node.adv(letter);
    }
    if(!node)
      return true;
    return false;
  }

  function addCrossCheck(r, c, preWord, postWord){
    let validLetters = Array();
    for(tile in rack){
      if(isWordValid(preWord + tile + postWord)){
        validLetters.push(tile);
      }
    }
  }

  function computeCrossChecks(){
    for(let c = 0, shouldCheck = Array(15); c < 15; c++) shouldCheck[i] = true;

    for(let r = 0; r < 15; r++){
      for(let c = 0; c < 15; c++){
        if(crossCheck[r][c] === " ")
          shouldCheck[c] = true;
        else if(shouldCheck){
          let preWord = Array();
          let postWord = Array();
          for(let tr = r - 1; r >= 0; r--){
            let tile = board[tr][c];
            if(tile === " ")
              break;
            preWord.add(tile);
          }
          for(let tr = r - 1; r >= 0; r--){
            let tile = board[tr][c];
            if(tile === " ")
              break;
            preWord.add(tile);
          }
          for(let tr = r + 1; r <15 0; r++){
            let tile = board[tr][c];
            if(tile === " ")
              break;
            postWord.add(tile);
          }
          preWord.reverse();
          addCrossCheck(checkRow, c, preWord, postWord);
          shouldCheck[c] = false;
        }
      }
    }

    function getLeftLimit(r, c){
      for(let i = 0, --r; r >= 0; i++, r--){
        if(board[r][c] != " ")
          break;
      }
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
            leftPrefixes(partialWord + tile, adv, limit -1);
            rack.push(tile);
          }
        }
      }
    }

    function extendRight(partialWord, node, r, c){
      if(isTerminal(node)){
        addWord(r, c - partialWord.length, partialWord);
      }
      if(c > 14) return;
      if(board[r][c] === " "){
        for(let i = 0 ; i < rack.length; i++){
          let tile = rack[i];
          let adv = node.advance(tile);
          if(adv && crossCheck[r][c].indexOf(tile) !== -1){
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

export ScrabbleSolver;
