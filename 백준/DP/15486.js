const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/15486.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  let max = 0; // 현재 인덱스까지 최대 값
  const dp = new Array(N + 1).fill(0); // 해당 인덱스 날까지 일했을때 최대 급여를 저장

  arr.forEach(([day, payment], idx) => {
    max = Math.max(dp[idx], max);
    dp[idx] = max;
    dp[idx + day] = Math.max(dp[idx + day], dp[idx] + payment);
  });

  return Math.max(...dp.slice(0, N + 1));
}

console.log(solution(N, arr));
