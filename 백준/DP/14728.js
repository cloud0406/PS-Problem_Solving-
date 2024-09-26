const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14728.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, T] = input[0].split(" ").map(Number);
const study = input.slice(1).map((v) => v.split(" ").map(Number));

const dp = Array(T + 1).fill(0); // 0 ~ T까지의 시간에 대한 최대 점수

study.forEach(([time, score]) => {
  for (let i = T; i >= time; i--) {
    dp[i] = Math.max(dp[i], dp[i - time] + score);
  }
});

console.log(dp[T]);
