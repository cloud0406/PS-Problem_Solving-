const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2294.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

function solution(n, k, coins) {
  // 코인의 합이 해당 인덱스가 되도록하는 최소 개수를 담음
  const dp = Array(k + 1).fill(Infinity);

  // 처음 각 코인 하나 사용
  for (let coin of coins) {
    dp[coin] = 1;
  }

  for (let i = 1; i <= k; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[k] === Infinity ? -1 : dp[k];
}

console.log(solution(n, k, coins));
