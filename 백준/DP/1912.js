const input = require("fs")
  .readFileSync(__dirname + "/input/1912.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);

const dp = [arr[0]];

for (let i = 1; i < N; i++) {
  // 연속 합이므로 경우의 수는 1.내 자신만 선택, 2.앞의 값과 더하기 => 총 2가지
  dp[i] = arr[i] > arr[i] + dp[i - 1] ? arr[i] : arr[i] + dp[i - 1];
}

console.log(Math.max(...dp));
