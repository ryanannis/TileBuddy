/* Computes all the possible move on a scrabble board, given
 * the root of a trie (a 26ry tree) and a board (a 9x9 array)*/
function ScrabbleSolver(trieRoot, board){
  /* 'Class' variables*/
  let crossCheck = Array();
  let rack = Array();

  function init(){
    for(let i = 0; i < 15; i++) crossCheck[i] = Array(9);
  }

  function computeCrossChecks(){
    for(let c = 0, shouldCheck = Array(15); c < 15; c++) shouldCheck[i] = true;

    for(let r = 0; r < 14; r++){
      for(let c = 0; c < 15; c++){
        if(crossCheck[r][c] === " ")
          shouldCheck[c] = true;
        else if(shouldCheck){
          let node = trieRoot;
          for(let lr = r; lr < 15; lr++){
            let letter = board[lr][c];
            if(letter === " "){

            }
          }
          shouldCheck[c] = false;
        }
      }
    }

    function leftPrefixes(){

    }

    function extendRight(){

    }
  }
};

export ScrabbleSolver;
