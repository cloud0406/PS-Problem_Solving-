const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20542.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const w1 = input[1];
const w2 = input[2];

const dp = Array.from({ length: n + 1 }, (_, i) => [i, ...Array(m).fill(0)]);
dp[0] = Array.from({ length: m + 1 }, (_, i) => i);

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    // 입력 문자 같을 때 : 대각선 위 그대로 저장
    if (
      w1[i - 1] === w2[j - 1] ||
      (w1[i - 1] === "v" && w2[j - 1] === "w") ||
      (w1[i - 1] === "i" && ["j", "l"].includes(w2[j - 1]))
    ) {
      dp[i][j] = dp[i - 1][j - 1];
    } else {
      // 입력 문자 다를 때  : 삽입, 삭제, 교체 중 최소값 + 1
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
}

console.log(dp[n][m]);
