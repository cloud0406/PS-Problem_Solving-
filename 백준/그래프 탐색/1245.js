const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1245.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((row) => row.split(" ").map(Number));

const DIRECTIONS = {
  dx: [1, 1, 0, -1, -1, -1, 0, 1],
  dy: [0, -1, -1, -1, 0, 1, 1, 1],
};

let peakCount = 0;
let isPeak = false;

const visited = Array.from({ length: N }, () => Array(M).fill(false));

function searchPeak(col, row) {
  for (let dir = 0; dir < 8; dir++) {
    const nextCol = col + DIRECTIONS.dx[dir];
    const nextRow = row + DIRECTIONS.dy[dir];

    if (isInBounds(nextCol, nextRow)) {
      // 현재 높이보다 더 높은 곳이 있다면 봉우리가 아님
      if (board[row][col] < board[nextRow][nextCol]) {
        isPeak = false;
      }

      // 이미 방문했거나 높이가 다르면 건너뛰기
      if (visited[nextRow][nextCol]) continue;

      // 같은 높이의 인접한 지점 탐색
      if (board[row][col] === board[nextRow][nextCol]) {
        visited[nextRow][nextCol] = true;
        searchPeak(nextCol, nextRow);
      }
    }
  }
}

// 좌표가 범위 내에 있는지 확인
function isInBounds(col, row) {
  return col >= 0 && row >= 0 && col < M && row < N;
}

for (let row = 0; row < N; row++) {
  for (let col = 0; col < M; col++) {
    if (!visited[row][col]) {
      isPeak = true;
      visited[row][col] = true;
      searchPeak(col, row);
      if (isPeak) peakCount++;
    }
  }
}

console.log(peakCount);
