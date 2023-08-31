const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/12865.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const items = input.slice(1).map((v) => v.split(" ").map(Number));

function soloution(N, K, items) {
  const dp = Array(K + 1).fill(0);

  for (let [W, V] of items) {
    // 앞의 값에 영향을 받아서 하나의 물품을 2개이상 쓰면 안되기 때문에 뒤에서부터 탐색
    for (let i = K; i >= W; i--) {
      dp[i] = Math.max(dp[i], dp[i - W] + V);
    }
  }

  return dp[K];
}

console.log(soloution(N, K, items));
