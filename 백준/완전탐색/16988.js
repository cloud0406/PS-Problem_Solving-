const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16988.txt"
  )
  .toString()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, M] = input.shift();
const EMPTY = 0,
  BLACK = 1,
  WHITE = 2;
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const board = input;
const emptySpaces = [];

// 빈 공간 좌표
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === EMPTY) {
      emptySpaces.push([i, j]);
    }
  }
}

let maxCaptured = 0;

// 가능한 두 수 조합 시도
for (let i = 0; i < emptySpaces.length - 1; i++) {
  for (let j = i + 1; j < emptySpaces.length; j++) {
    const [x1, y1] = emptySpaces[i];
    const [x2, y2] = emptySpaces[j];

    board[x1][y1] = BLACK;
    board[x2][y2] = BLACK;

    const captured = countStones();
    maxCaptured = Math.max(maxCaptured, captured);

    board[x1][y1] = EMPTY;
    board[x2][y2] = EMPTY;
  }
}

function countStones() {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let totalCaptured = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === WHITE && !visited[i][j]) {
        const result = checkGroup(i, j, visited);
        if (result.isTrapped) {
          totalCaptured += result.size;
        }
      }
    }
  }

  return totalCaptured;
}

function checkGroup(startX, startY, visited) {
  const queue = [[startX, startY]];
  visited[startX][startY] = true;
  let size = 1;
  let isTrapped = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny]) continue;

      if (board[nx][ny] === WHITE) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
        size++;
      } else if (board[nx][ny] === EMPTY) {
        isTrapped = false;
      }
    }
  }

  return { size, isTrapped };
}

console.log(maxCaptured);
