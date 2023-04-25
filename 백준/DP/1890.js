const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1890.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const arr = input.map((v) => v.split(" ").map(Number));

// dp에 시작점에서 해당 경로에 도착할 수 있는 가지수를 갱신
const dp = Array.from({ length: n }, () => Array(n).fill(BigInt(0)));
dp[0][0] = BigInt(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let num = arr[i][j];

    if (num === 0) continue;

    // 도착 지점에 현재 지점까지의 가지수를 더함
    if (i + num < n) dp[i + num][j] += dp[i][j];
    if (j + num < n) dp[i][j + num] += dp[i][j];
  }
}

console.log(dp[n - 1][n - 1].toString());
