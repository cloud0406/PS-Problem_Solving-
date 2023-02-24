const input = require("fs")
  .readFileSync(__dirname + "/input/11053.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const A = input[1].split(" ").map(Number); // 수열 저장

const dp = Array.from({ length: n }, () => 0); // 수열의 길이를 저장할 dp 배열

for (let i = 0; i < n; i++) {
  let max = 0;

  // * 주의할 점 : 단순히 현재 input값이 크다고 max 값을 변경하면 가장 마지막 dp 값이 max로 설정되므로 추가 설정 필요 -> dp[j] > max *
  // ex) input : 30 / [10, 20, 10, 30]
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j] && dp[j] > max) {
      max = dp[j];
    }
  }
  dp[i] = max + 1; // 자기 자신까지 길이에 추가
}

console.log(Math.max(...dp));
