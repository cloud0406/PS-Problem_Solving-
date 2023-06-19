const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/21317.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const K = +input[N];

function solution(N, arr, K) {
  if (N === 1) {
    return 0;
  }

  const dp = Array.from({ length: N + 1 }, () => new Array(2).fill(Infinity));

  dp[0][0] = 0;
  dp[1][0] = arr[0][0];
  dp[2][0] = Math.min(arr[0][0] + arr[1][0], arr[0][1]); // 작은 점프 2번 or 큰 점프 1번

  for (let i = 3; i < N; i++) {
    // 매우 큰 점프 X
    dp[i][0] = Math.min(
      dp[i - 1][0] + arr[i - 1][0], // 한 칸 이전에서 작은 점프
      dp[i - 2][0] + arr[i - 2][1] // 두 칸 이전에서 큰 점프
    );

    // 매우 큰 점프 사용
    dp[i][1] = Math.min(
      Math.min(dp[i - 1][1] + arr[i - 1][0], dp[i - 2][1] + arr[i - 2][1]), // 매우 큰 점프 이미 사용 -> 사용한 배열에서 작은 점프 or 큰 점프 할 경우
      dp[i - 3][0] + K // 한 번도 매우 큰 점프를 사용하지 않았을때의 최소값 + 매우 큰 점프 사용
    );
  }

  return Math.min(...dp[N - 1]);
}

console.log(solution(N, arr, K));
