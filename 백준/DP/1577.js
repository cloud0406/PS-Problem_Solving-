const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1577.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
let output = [];
let [n, m] = input[line++].split(" ").map(Number);
let k = Number(input[line++]);

function solve() {
  let dp = [...Array(n + 1)].map(() => Array(m + 1).fill(BigInt(0)));
  let block = [...Array(n + 1)].map(() => Array(m + 1).fill([false, false]));

  for (let i = 0; i <= n; ++i) {
    for (let j = 0; j <= m; ++j) {
      dp[i][j] = BigInt(0);
      block[i][j] = [false, false]; // 막혀있는 길이 가로인지, 세로인지 따라 불린값으로 표시
    }
  }

  for (let i = 0; i < k; ++i) {
    let [x1, y1, x2, y2] = input[line++].split(" ").map(Number);

    if (x1 > x2) [x1, x2] = [x2, x1];
    if (y1 > y2) [y1, y2] = [y2, y1];

    if (x1 != x2) block[x2][y2][0] = true; // x2,y2의 위쪽 길 막음
    if (y1 != y2) block[x2][y2][1] = true; // x2,y2의 왼쪽 길 막음
  }

  dp[0][0] = BigInt(1);

  // 막혀있는 길 제외하고 위, 왼쪽 경우의 수 더하기
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i != 0 && !block[i][j][0]) dp[i][j] += dp[i - 1][j]; // 위쪽 길 막혀있나 체크 후 더해줌
      if (j != 0 && !block[i][j][1]) dp[i][j] += dp[i][j - 1]; // 왼쪽 길 막혀있나 체크 후 더해줌
    }
  }

  output.push(dp[n][m]);
}

solve();

console.log(output.join("\n"));
