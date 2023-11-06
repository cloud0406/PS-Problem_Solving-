const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18427.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, H] = input[0].split(" ").map(Number);
const blockList = input.slice(1).map((v) => [0, ...v.split(" ").map(Number)]);

function solution(N, M, H, blockList) {
  const dp = Array.from({ length: N + 1 }, () => Array(H + 1).fill(0));
  dp[0][0] = 1;

  for (let i = 0; i < N; i++) {
    for (let h = 0; h <= H; h++) {
      if (dp[i][h]) {
        for (let block of blockList[i]) {
          if (h + block <= H) {
            dp[i + 1][h + block] = (dp[i][h] + dp[i + 1][h + block]) % 10007;
          }
        }
      }
    }
  }

  return dp[N][H];
}

console.log(solution(N, M, H, blockList));
