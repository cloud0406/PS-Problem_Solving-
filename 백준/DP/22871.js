const input = require("fs")
  .readFileSync(__dirname + "/input/22871.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];

const arr = input[1].split(" ").map(Number);

const dp = Array.from(Array(N).fill(Infinity));
dp[0] = 0;

// dp 배열에 가장 왼쪽에서부터 해당 인덱스까지 오는 경로중, '돌을 한번 건널때 쓸 수 있는 최대 힘 K' 값을 저장
for (let j = 1; j < N; j++) {
  for (let i = 0; i < j; i++) {
    const K = (j - i) * (1 + Math.abs(arr[j] - arr[i]));
    dp[j] = Math.min(dp[j], Math.max(dp[i], K));
  }
}

// 마지막에 최대 힘 K 값들 중 최솟값을 구함
console.log(dp[N - 1]);
