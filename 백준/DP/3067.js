const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3067.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
let idx = 1;
let answer = [];

for (let t = 0; t < T; t++) {
  const N = input[idx++];
  const coins = input[idx++].split(" ").map(Number);
  const M = +input[idx++];

  const dp = Array(M + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let i = coin; i <= M; i++) {
      dp[i] += dp[i - coin];
    }
  }

  answer.push(dp[M]);
}

console.log(answer.join("\n"));
