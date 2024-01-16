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
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16932.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false));
const zeros = [];
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let num = 0;
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0) zeros.push([i, j]); // 0이 들어있는 좌표 모아두기
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1 && !visited[i][j]) grouping(i, j); // 1이 들어있는 좌표 인접한 것 그룹 지정
  }
}

// 0인 칸을 1로 바꿔보며
for (const [x, y] of zeros) {
  let cnt = 1;
  const map = {};

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (board[nx][ny] === 0) continue;

    map[visited[nx][ny][0]] = visited[nx][ny][1]; // 해당 좌표와 인접한 영역들 중 그룹핑되어 있는 값들 저장
  }

  for (const key in map) cnt += map[key]; // 현재 좌표와 인접한 그룹핑 값들을 더해서 모두 이어줌

  answer = Math.max(answer, cnt);
}

console.log(answer);

// 1로 되어있는 칸들 중 인접한 것 묶어서 visited에 표시
function grouping(i, j) {
  const queue1 = new Queue(); // 인접한 칸 찾기 위해 사용되는 탐색용
  const queue2 = new Queue(); // 그룹에 포함되는 칸들에게 포함된 칸의 개수를 알려주는 용도
  queue1.push([i, j]);
  queue2.push([i, j]);
  visited[i][j] = [num, 1];
  let cnt = 1;

  while (!queue1.isEmpty()) {
    const [x, y] = queue1.front();
    queue1.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 0) continue;
      if (visited[nx][ny] !== false) continue;

      queue1.push([nx, ny]);
      queue2.push([nx, ny]);
      visited[nx][ny] = [num, 1];
      cnt += 1;
    }
  }

  while (!queue2.isEmpty()) {
    const [x, y] = queue2.front();
    queue2.pop();

    visited[x][y] = [num, cnt];
  }

  num++;
}
