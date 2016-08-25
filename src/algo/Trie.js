/*todo: turn letter into number and use arrays */
class Trie{
  advance(letter){
    if(this.neighbours.letter){
      this = this.neighbours.letter;
      return true;
    }
    return false;
  }
}
