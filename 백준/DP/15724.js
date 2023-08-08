const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/15724.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const K = +input[N + 1];
const arrange = input.slice(N + 2).map((v) => v.split(" ").map(Number));

function soloution(N, M, arr, K, arrange) {
  let answer = [];
  const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

  // 1,1 ~ i,j 범위의 직사각형내부의 누적합을 구함
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      dp[i][j] =
        arr[i - 1][j - 1] + dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
    }
  }

  // 위에서 구한 누적합을 통해 x1,y1 ~ x2,y2 범위합 구함
  for (let i = 0; i < K; i++) {
    [x1, y1, x2, y2] = arrange[i];

    answer.push(
      dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1]
    );
  }

  return answer.join("\n");
}

console.log(soloution(N, M, arr, K, arrange));
