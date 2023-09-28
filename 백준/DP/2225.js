const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2225.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

function soloution(N, K) {
  let answer = 0;

  const dp = Array.from({ length: K + 1 }, () => Array(N + 1).fill(0));

  for (let i = 1; i <= K; i++) {
    dp[i] = new Array(N + 1).fill(i === 1 ? 1 : 0);
    dp[i][0] = 1;
  }

  for (let i = 2; i <= K; i++) {
    for (let j = 1; j <= N; j++) {
      dp[i][j] =
        dp[i - 1].slice(0, j + 1).reduce((acc, cur) => acc + cur, 0) %
        1000000000;
    }
  }

  return dp[K][N];
}

console.log(soloution(N, K));
