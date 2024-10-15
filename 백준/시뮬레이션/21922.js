const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21922.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const grid = input.map((line) => line.split(" ").map(Number));

// 에어컨 위치
const airConditioners = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (grid[i][j] === 9) airConditioners.push([i, j]);
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from({ length: N }, () => Array(M).fill(0));

const bfs = (startRow, startCol) => {
  const queue = [[startRow, startCol]];

  while (queue.length) {
    const [currentRow, currentCol] = queue.shift();

    for (let [dx, dy] of directions) {
      let nextRow = currentRow + dx;
      let nextCol = currentCol + dy;

      // 한 방향으로 벽을 만나기 전까지 계속 이동
      while (nextRow >= 0 && nextRow < N && nextCol >= 0 && nextCol < M) {
        visited[nextRow][nextCol] = 1;

        if (grid[nextRow][nextCol] === 9) break; // 다른 에어컨 만나면 종료

        // 벽 3번: 방향 반전 (대각선 회전)
        if (grid[nextRow][nextCol] === 3) {
          [dx, dy] = [-dy, -dx];
        }
        // 벽 4번: 방향 전환 (90도 회전)
        else if (grid[nextRow][nextCol] === 4) {
          [dx, dy] = [dy, dx];
        }
        // 벽 1번: 상하 방향 이동 중 좌우 벽을 만나면 중단
        else if (grid[nextRow][nextCol] === 1 && dx === 0) {
          break;
        }
        // 벽 2번: 좌우 방향 이동 중 상하 벽을 만나면 중단
        else if (grid[nextRow][nextCol] === 2 && dy === 0) {
          break;
        }

        nextRow += dx;
        nextCol += dy;
      }
    }
  }
};

// 모든 에어컨 위치에서 BFS
for (const [row, col] of airConditioners) {
  visited[row][col] = 1; // 에어컨 자체도 방문 처리
  bfs(row, col);
}

const result = visited.flat().reduce((sum, cell) => sum + cell, 0);

console.log(result);
