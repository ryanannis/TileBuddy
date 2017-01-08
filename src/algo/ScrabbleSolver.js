/* See https://www.cs.cmu.edu/afs/cs/academic/class/15451-s06/www/lectures/scrabble.pdf for
 * more details on the algorithm.*/

function solveBoard(trieRoot, board, rack){
  let crossCheck = Array(255);
  let wordList = [];
  let horizontal = true;
  console.log(trieRoot);
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
    wordList.push({word, row:c, col: c});
  }

  function isSquareAnchor(r, c){
    if(crossCheck[r * 15 + c].length > 0){
      return true; //Cross checks are always anchors
    }
    if( r < 14 && board[r * 15  + (c + 1)] !== ''){
      return true;
    }
    if( r > 0 && board[r* 15 + (c - 1)] !== ''){
      return true;
    }
    return false;
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
    r = r-1;

    let i;
    for(i = 0; r >= 0; i++, r--){
      if(board[r * 15 + c] !== ' ' || isSquareAnchor[r * 15 + c])
        break;
    }

    /* If we encounter our last empty square not at the board's edge,
        that means there is tile to the left of it */
    if(r !== 0) i--;
    
    return i;
  }


  /* Generates all the left prefixes for a word at a square (r,c) 
   * and then extends each one rightwards.  Note that extendRight
   * INCLUDES the anchor square. */
  function leftPrefixes(partialWord, node, limit, r, c){
    extendRight(partialWord, node, r, c);
    if(limit > 0){
      for(let i = 0 ; i < rack.length; i++){
        let tile = rack[i];
        let advance = node.advance(tile);
        if(advance){
          rack.splice(i, 1);
          leftPrefixes(partialWord + tile, advance, limit - 1);
          rack.push(tile);
        }
      }
    }
  }

  function extendRight(partialWord, node, r, c){
    if(c > 14) return;
    if(node.isTerminal()){
      if(!partialWord){
        console.log(node);
      }
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

        if((advance && crossCheck[r * 15 + c].length === 0) || crossCheck[r * 15 + c].indexOf(tile) !== -1){
          /* Remove the tile from the rack */
          rack.splice(i, 1);
          
          /* Find all right prefixes */
          extendRight(partialWord + tile, advance, r, c+1);

          /* Put tile back */
          rack.push(tile);
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
      console.log(`${r} ${c}`);
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
    findAllWords();
  }

  exec();
  console.log('wordlist', wordList);

  return wordList;
};

export default solveBoard;
