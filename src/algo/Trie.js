/*todo: turn letter into number and use arrays */
class Trie{
  constructor(){
    this.edges = new Map();
  }

  /* Adds new node with THIS AS ROOT */
  addWord(word){
    if(this.edges.has(word[0])){
      this.edges.get(word[0]).addWord(word.substring(1));
    }
    else{
      let nextNode = new Trie();
      this.edges.set(word[0], nextNode);
      nextNode.addWord(word.substring(1));
    }
  }

  isTerminal(){
    for(i of this.edges)
      return false;
    return true;
  }

  advance(letter){
    if(!(letter in this.edges))
      return false;
    return this.edges[letter];
  }
}

export {Trie};
