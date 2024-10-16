const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11985.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const oranges = [0, ...input.slice(1).map(Number)];

// dp[i]: i번째 오렌지까지 포장했을 때 최소 비용 저장
const dp = Array(N + 1).fill(0);
dp[1] = K; // 첫 번째 오렌지를 포장하는 기본 비용

for (let i = 2; i <= N; i++) {
  let minOrange = oranges[i];
  let maxOrange = oranges[i];

  // i번째 오렌지를 따로 포장하는 경우 비용 계산
  dp[i] = dp[i - 1] + K;

  // i번째 오렌지를 포함해 여러 개를 한 상자에 포장하는 경우
  for (let size = 2; size <= Math.min(M, i); size++) {
    const j = i - size + 1; // 포장 상자의 가장 왼쪽 오렌지 인덱스

    // 현재 상자에서 최소, 최대 오렌지 크기 갱신
    minOrange = Math.min(minOrange, oranges[j]);
    maxOrange = Math.max(maxOrange, oranges[j]);

    // 상자 비용 계산: 기본 비용 + 오렌지들의 최대-최소 차이에 따른 추가 비용
    const boxCost = K + size * (maxOrange - minOrange);

    // 현재까지 최소 포장 비용 갱신
    dp[i] = Math.min(dp[i], dp[j - 1] + boxCost);
  }
}

console.log(dp[N]);
