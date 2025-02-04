const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/7579.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [[n, m], M, C] = input.map((line) => line.split(" ").map(Number));

const sumC = C.reduce((pre, cur) => pre + cur);
const dp = Array(sumC + 1).fill(0);

for (let a = 0; a < n; a++) {
  const memory = M[a];
  const cost = C[a];

  for (let i = sumC; i >= cost; i--) {
    dp[i] = Math.max(dp[i], dp[i - cost] + memory);
  }
}

console.log(dp.findIndex((it) => it >= m));
