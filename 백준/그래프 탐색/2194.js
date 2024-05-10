let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2194.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, A, B, K] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, () => Array(M).fill(0));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

class Queue {
  constructor() {
    this.data = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(v) {
    this.data[this.rear++] = v;
  }

  dequeue() {
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    let tmp = this.data[this.front];
    delete this.data[this.front++];

    return tmp;
  }

  size() {
    return this.rear - this.front;
  }
}

// 장애물 표시
for (let i = 1; i <= K; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  board[x - 1][y - 1] = -1;
}

// 시작 지점, 도착 지점 설정
const [fromX, fromY] = input[K + 1].split(" ").map((v) => +v - 1);
const [toX, toY] = input[K + 2].split(" ").map((v) => +v - 1);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

// 유닛이 장애물에 걸리는지 확인
const isBlock = (x, y) => {
  for (let i = 0; i < A; i++) {
    for (let j = 0; j < B; j++) {
      if (board[x + i][y + j] === -1) return false;
    }
  }

  return true;
};

const bfs = () => {
  const queue = new Queue();
  queue.enqueue([fromX, fromY, 0]);

  while (queue.size()) {
    const [x, y, cnt] = queue.dequeue();

    // 도착
    if (x === toX && y === toY) return cnt;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      // 방문한 곳이거나, 유닛이 밖으로 나가거나, 유닛이 장애물에 걸리면 패스
      if (
        nx < 0 ||
        ny < 0 ||
        nx + A > N ||
        ny + B > M ||
        visited[nx][ny] ||
        !isBlock(nx, ny)
      )
        continue;

      visited[nx][ny] = true;
      queue.enqueue([nx, ny, cnt + 1]);
    }
  }

  return -1;
};

console.log(bfs());
