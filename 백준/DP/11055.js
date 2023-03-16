const input = require("fs")
  .readFileSync(__dirname + "/input/11055.txt")
  .toString()
  .trim()
  .split("\n");

const N = input[0];
const arr = input[1].split(" ").map(Number);

// 0번부터 현재 인덱스까지의 '합이 가장 큰 증가하는 부분 수열'의 합을 담음
const dp = [...arr];

// 이중 포문으로 하나씩 순회하며 0~i-1 번 인덱스 탐색
for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    // 증가하는 부분수열이므로 현재 인덱스보다 큰지 체크
    if (arr[j] < arr[i]) {
      dp[i] = Math.max(dp[i], dp[j] + arr[i]); // dp값 순회하며 부분 수열 합 최대가 되도록 갱신
    }
  }
}

console.log(Math.max(...dp));
