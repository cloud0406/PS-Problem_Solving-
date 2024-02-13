class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22868.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((v) => +v);
const [S, E] = input[M + 1].split(" ").map((v) => +v);
const graph = [];
const visited = [];
const answer = [];

for (let i = 1; i <= N; i++) {
  graph[i] = [];
  visited[i] = [false, []];
}

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map((v) => +v);

  graph[a].push(b);
  graph[b].push(a);
}

// 사전순으로 방문하기 위해 정렬
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

function bfs(s, e) {
  const queue = new Queue();
  queue.push(s);
  visited[s][0] = true;

  while (!queue.isEmpty()) {
    const x = queue.front();
    queue.pop();
    visited[x][1].push(x);

    if (x === e) return; // 도착지점에 도달하면 종료

    for (const next of graph[x]) {
      if (visited[next][0]) continue; // 방문했다면 건너 뜀

      visited[next][0] = true;
      visited[next][1] = [...visited[x][1]]; // 지나온 경로 저장, 다음 경로에 지금껏 지나온 경로들을 저장함
      queue.push(next);
    }
  }
}

bfs(S, E);
answer[0] = visited[E][1].length - 1; // S -> E로 가는 최단 경로

// visited 배열 초기화 , S -> E로 갔던 경로 표시 (S, E는 다시 지나야 하므로 제외)
const temp = [...visited[E][1]];
for (let i = 1; i <= N; i++) visited[i] = [false, []];
for (const node of temp) visited[node][0] = true;
visited[S][0] = false;
visited[E][0] = false;

bfs(E, S);
answer[1] = visited[S][1].length - 1; // E -> S로 가는 최단 경로

console.log(answer[0] + answer[1]);
