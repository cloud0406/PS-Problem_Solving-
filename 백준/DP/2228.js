const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2228.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [n, m] = input[0].split(" ").map(Number);
let sum = new Array(n + 1).fill(0);

// dp[i][j] => i개의 원소를 가진 배열로 j개의 구간 선택시 최대 값
let dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  sum[i] = +input[i] + sum[i - 1];
}

for (let j = 1; j <= m; j++) {
  dp[0][j] = -Infinity;
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    dp[i][j] = dp[i - 1][j];
    for (let k = 1; k <= i; k++) {
      if (k >= 2)
        dp[i][j] = Math.max(dp[i][j], dp[k - 2][j - 1] + sum[i] - sum[k - 1]);
      else if (k === 1 && j === 1) dp[i][j] = Math.max(dp[i][j], sum[i]);
    }
  }
}

console.log(dp[n][m]);
