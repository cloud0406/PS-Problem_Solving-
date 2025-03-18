const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17404.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const house = input.map((line) => line.split(" ").map(Number));

let answer = Infinity;

for (let firstColor = 0; firstColor < 3; firstColor++) {
  const dp = Array.from({ length: N }, () => Array(3).fill(Infinity));

  dp[0][firstColor] = house[0][firstColor];

  for (let i = 1; i < N; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + house[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + house[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + house[i][2];
  }

  // 마지막 집, 첫 번째 집 색깔 다르게
  for (let lastColor = 0; lastColor < 3; lastColor++) {
    if (lastColor !== firstColor) {
      answer = Math.min(answer, dp[N - 1][lastColor]);
    }
  }
}

console.log(answer);
