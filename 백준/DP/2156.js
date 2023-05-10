const [N, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2156.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function soloution() {
  const wine = [0, ...input];
  const dp = Array.from({ length: N + 1 }, () => 0);
  dp[1] = wine[1];
  dp[2] = wine[1] + wine[2];

  for (let i = 3; i <= N; i++) {
    dp[i] = Math.max(
      dp[i - 1], // 1. n번째 포도주 안마시는 경우
      dp[i - 3] + wine[i - 1] + wine[i], // 2. 3칸전 dp최대 값, 이전 포도주, 현재 포도주
      dp[i - 2] + wine[i] // 3. 2칸전 dp 최대 값, 현재 포도주
    );
  }

  return dp[N];
}

console.log(soloution());
