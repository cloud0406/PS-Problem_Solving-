class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}

let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17141.txt"
  )
  .toString()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, M] = input.shift();
let answer = Infinity;

const virus = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (input[i][j] == 2) {
      virus.push([i, j]);
      input[i][j] = Infinity;
    } else if (input[i][j] == 0) {
      input[i][j] = Infinity;
    } else {
      input[i][j] = -1;
    }
  }
}

const possibleVirucLoc = [];

function dfsVirus(arr) {
  if (arr.length == M) {
    possibleVirucLoc.push([...arr]);
    return;
  } else {
    for (let i = arr[arr.length - 1] + 1; i < virus.length; i++) {
      arr.push(i);
      dfsVirus(arr);
      arr.pop();
    }
  }
}

for (let i = 0; i < virus.length; i++) {
  dfsVirus([i]);
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

possibleVirucLoc.forEach((v) => {
  let board = input.map((v) => [...v]);

  const q = new Queue();

  v.forEach((v) => {
    const [x, y] = virus[v];
    board[x][y] = 0;
    q.push([x, y, 0]);
  });

  while (q.length > 0) {
    const [x, y] = q.pop();
    const time = board[x][y];

    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];
      if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] <= time + 1)
        continue;
      board[nx][ny] = time + 1;
      q.push([nx, ny]);
    }
  }

  const flatBoard = [...new Set(board.flat())];
  if (!flatBoard.includes(Infinity)) {
    const max = Math.max(...flatBoard);
    answer = Math.min(max, answer);
  }
});

if (answer == Infinity) console.log(-1);
else console.log(answer);
