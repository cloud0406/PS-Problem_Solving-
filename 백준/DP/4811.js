const fs = require("fs");
const pill = fs
  .readFileSync(
    process.platform === "linux" ? "./dev/stdin" : __dirname + "/input/4811.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);
pill.pop();

const MAX = Math.max(...pill);
const dp = new Array(MAX + 1).fill(0);

dp[0] = 1;
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= MAX; i++) {
  for (let j = 0; j < i; j++) {
    dp[i] += dp[j] * dp[i - j - 1];
  }
}

const answer = [];
pill.forEach((v) => {
  answer.push(dp[v]);
});

console.log(answer.join("\n"));
