const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1937.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const board = input.slice(1).map((str) => str.split(" ").map(Number));

const DIRECTIONS = {
  dx: [0, 0, 1, -1],
  dy: [1, -1, 0, 0],
};

// -1 방문 x
const dp = Array.from(Array(n), () => Array(n).fill(-1));
let maxPath = 1; // 최대 이동 경로 길이

function dfs(x, y) {
  // 이미 계산된 위치라면 저장된 값 반환
  if (dp[x][y] !== -1) return dp[x][y] + 1;

  dp[x][y] = 0; // 방문 표시

  for (let k = 0; k < 4; k++) {
    const nx = x + DIRECTIONS.dx[k];
    const ny = y + DIRECTIONS.dy[k];

    if (nx >= 0 && ny >= 0 && nx < n && ny < n && board[nx][ny] > board[x][y]) {
      dp[x][y] = Math.max(dp[x][y], dfs(nx, ny));
    }
  }

  return dp[x][y] + 1;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    maxPath = Math.max(maxPath, dfs(i, j));
  }
}

console.log(maxPath);
