const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/22869.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const stones = input[1].split(" ").map(Number);

function soloution(N, K, stones) {
  const dp = Array(N).fill(false);
  dp[0] = true; // 자기 자신은 갈 수 있음

  // i -> j 돌 건널 수 있는지
  const isPossible = (idx1, idx2) => {
    let power = (idx2 - idx1) * (1 + Math.abs(stones[idx2] - stones[idx1]));
    return power <= K ? true : false;
  };

  // 가장 왼쪽부터 갈 수 있는 곳들을 체크해나감
  for (let i = 0; i < N; i++) {
    // 갈 수 있는 돌만 체크
    if (dp[i]) {
      for (let j = i + 1; j < N; j++) {
        if (isPossible(i, j)) dp[j] = true; // i->j 가능하면 체크
      }
    }
  }

  // dp에는 가장 왼쪽부터 갈 수 있는 모든 곳들이 true로 되어있으므로 가장 마지막돌 갈 수 있는지 체크
  return dp[N - 1] ? "YES" : "NO";
}

console.log(soloution(N, K, stones));
