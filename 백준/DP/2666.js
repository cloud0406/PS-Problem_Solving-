const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2666.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const [open1, open2] = input[1].split(" ").map(Number);
const M = parseInt(input[2]);
const order = input.slice(3, 3 + M).map(Number);

const dp = Array.from({ length: M }, () =>
  Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => -1))
);

function solve(orderIdx, open1, open2) {
  if (orderIdx === M) {
    return 0;
  }

  if (dp[orderIdx][open1][open2] !== -1) {
    return dp[orderIdx][open1][open2];
  }

  const open1_cnt =
    solve(orderIdx + 1, order[orderIdx], open2) +
    Math.abs(order[orderIdx] - open1);
  const open2_cnt =
    solve(orderIdx + 1, open1, order[orderIdx]) +
    Math.abs(order[orderIdx] - open2);

  dp[orderIdx][open1][open2] = Math.min(open1_cnt, open2_cnt);

  return dp[orderIdx][open1][open2];
}

console.log(solve(0, open1, open2));
