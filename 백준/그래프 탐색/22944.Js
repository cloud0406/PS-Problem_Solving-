const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22944.txt";
const stdin = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((s) => s.trim());
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this._size = 0;
    this._front = null;
    this._rear = null;
  }

  push(item) {
    const node = new Node(item);

    if (this.empty()) {
      this._front = this._rear = node;
      this._size++;
      return;
    }

    this._rear.next = node;
    this._rear = node;
    this._size++;
  }

  pop() {
    if (this.empty()) {
      return -1;
    }

    if (this.size() === 1) {
      this._size--;
      const tmp = this._front.item;
      this._front = this._rear = null;

      return tmp;
    }

    this._size--;
    const tmp = this._front.item;
    this._front = this._front.next;

    return tmp;
  }

  size() {
    return this._size;
  }

  empty() {
    return !this._size ? 1 : 0;
  }

  front() {
    if (this.empty()) return -1;

    return this._front.item;
  }

  back() {
    if (this.empty()) return -1;

    return this._rear.item;
  }
}

const [N, H, D] = input().split(" ").map(Number);

const map = [];

for (let i = 0; i < N; i++) {
  map.push(input().split(""));
}

const U = new Map();

let c = 1;

let sy, sx, ey, ex;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (map[y][x] === "U") {
      const key = `${y} ${x}`;
      U.set(key, c);
      c++;
    } else if (map[y][x] === "S") {
      sy = y;
      sx = x;
    } else if (map[y][x] === "E") {
      ey = y;
      ex = x;
    }
  }
}

const bfs = (map, U, H, D, N, sy, sx, ey, ex) => {
  const q = new Queue();
  q.push({ y: sy, x: sx, h: H + 1, d: 0, k: 0, m: 0 });

  const visited = Array.from(Array(U.size + 1), () =>
    Array.from(Array(N), () => Array(N).fill(false))
  );

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  while (q.size()) {
    const size = q.size();

    for (let i = 0; i < size; i++) {
      let { y, x, h, d, k, m } = q.pop();

      if (visited[k][y][x]) continue;

      visited[k][y][x] = true;

      if (y === ey && x === ex) return m;

      if (d) d--;
      else h--;

      if (!h) continue;

      for (let j = 0; j < 4; j++) {
        const ny = y + dy[j];
        const nx = x + dx[j];

        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;

        let nd = d,
          nk = k;

        if (map[ny][nx] === "U") {
          nd = D;
          nk = U.get(`${ny} ${nx}`);
        }

        q.push({ y: ny, x: nx, h, d: nd, k: nk, m: m + 1 });
      }
    }
  }

  return -1;
};

console.log(bfs(map, U, H, D, N, sy, sx, ey, ex));
