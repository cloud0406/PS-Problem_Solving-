const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1823.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;

const readline = () => input[line++];

const N = parseInt(readline());
const v = [0].concat(Array.from({ length: N }, () => parseInt(readline())));
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, (_, i) => (i === 0 ? 0 : v[i] * N))
);

for (let left = 1; left <= N; left++) {
  for (let right = left - 1; right > 0; right--) {
    dp[right][left] = Math.max(
      dp[right + 1][left] + v[right] * (N - left + right),
      dp[right][left - 1] + v[left] * (N - left + right)
    );
  }
}

console.log(dp[1][N]);
