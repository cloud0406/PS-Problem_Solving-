const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14925.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
const matrix = input.slice(1, M + 1).map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
let max = 0;

for (let i = 1; i <= M; i++) {
  for (let j = 1; j <= N; j++) {
    if (matrix[i - 1][j - 1] === 0) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      max = Math.max(dp[i][j], max);
    }
  }
}

console.log(max);
