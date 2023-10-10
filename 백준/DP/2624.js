const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2624.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
const k = +input[1];
const coins = input.slice(2).map((v) => v.split(" ").map((v) => Number(v)));

function solution(T, k, coins) {
  const dp = Array(T + 1).fill(0);
  dp[0] = 1; // 0원 경우의 수는 1개

  for (const [coin, total] of coins) {
    for (let money = T; money >= 0; money--) {
      for (let cnt = 1; cnt <= total; cnt++) {
        if (money - coin * cnt >= 0) {
          dp[money] += dp[money - coin * cnt];
        }
      }
    }
  }

  return dp[T];
}

console.log(solution(T, k, coins));
