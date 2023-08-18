const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9084.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(input) {
  let T = +input[0];
  let order = 0;
  let answer = [];

  while (T--) {
    const N = +input[order * 3 + 1];
    const coins = input[order * 3 + 2].split(" ").map(Number);
    const M = +input[order * 3 + 3];

    const dp = Array(M + 1).fill(0);
    dp[0] = 1;

    for (let coin of coins) {
      for (let i = 1; i <= M; i++) {
        if (i - coin >= 0) dp[i] += dp[i - coin];
      }
    }

    answer.push(dp[M]);

    order++;
  }

  return answer.join("\n");
}

console.log(solution(input));
