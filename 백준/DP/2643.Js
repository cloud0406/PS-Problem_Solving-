const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2643.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
// 넓이 기준 내림차순 (큰 색종이부터 검사)
const paperList = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => b[0] * b[1] - a[0] * a[1]);

// DP[i] : i번째 색종이가 제일 위에 있을 때의, 최대 색종이를 쌓은 경우의 수
const dp = Array(N).fill(1);

for (let i = 0; i < N - 1; i++) {
  const [ih, iw] = paperList[i];
  for (let j = i + 1; j < N; j++) {
    const [jh, jw] = paperList[j];
    // 색종이를 돌리는 경우도 고려
    if ((ih >= jh && iw >= jw) || (ih >= jw && iw >= jh)) {
      dp[j] = Math.max(dp[j], dp[i] + 1); // i번째 색종이가 제일 위에 있을 때의 경우에 현재 색종이 하나 추가로 쌓음
    }
  }
}

console.log(Math.max(...dp));
