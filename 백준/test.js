class Node {
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node(); //루트는 항상 비어있어야한다.
  }

  insert(string) {
    let curr = this.root;
    for (let char of string) {
      if (!curr.children[char]) {
        curr.children[char] = new Node(curr.value + char);
      }
      curr = curr.children[char];
    }
    curr.end = true;
  }

  autoComplete(string) {
    let curr = this.root;
    let queue = [];
    let saveData = [];
    for (let char of string) {
      if (curr.children[char]) {
        curr = curr.children[char];
      }
    }

    console.log(curr);
    queue.push(curr);

    while (queue.length) {
      curr = queue.shift();
      if (curr.end) saveData.push(curr.value);
      for (let obj in curr.children) {
        if (curr.children[obj]) queue.push(curr.children[obj]);
      }
    }
    return saveData;
  }
}

const trie = new Trie();
trie.insert("hello");
trie.insert("hell");
trie.insert("hell2");
trie.insert("hell34");
trie.insert("2342344");
console.log(trie.autoComplete("apple"));
