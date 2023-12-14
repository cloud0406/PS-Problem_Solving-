const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2056.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dp = new Array(N).fill(0);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

dp[1] = arr[0][0];

for (let i = 1; i < N; i++) {
  if (arr[i][1] === 0) {
    dp[i + 1] = arr[i][0];
    continue;
  }

  let max = 0;

  for (let j = 0; j < arr[i][1]; j++) {
    max = Math.max(max, dp[arr[i][2 + j]]);
  }

  dp[i + 1] = max + arr[i][0];
}

console.log(Math.max(...dp));
