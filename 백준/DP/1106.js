const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1106.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [C, N] = input[0].split(" ").map(Number);
const arr = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

function solution(C, N, arr) {
  const dp = Array.from({ length: C + 1 }, () => Infinity);
  dp[0] = 0;

  for (let [cost, cnt] of arr) {
    if (dp[cnt] > cost) dp[cnt] = cost;

    for (let i = 1; i <= C; i++) {
      if (i < cnt) dp[i] = Math.min(dp[i], cost);
      else dp[i] = Math.min(dp[i], dp[cnt] + dp[i - cnt]);
    }
  }

  return dp[C];
}

console.log(solution(C, N, arr));
