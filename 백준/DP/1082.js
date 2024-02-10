const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1082.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const M = +input[2];
const prices = input[1].split(" ");
const dp = Array.from({ length: 51 }).fill("0");

for (let i = N - 1; i >= 0; i -= 1) {
  const price = prices[i];
  for (let j = +price; j <= M; j += 1) {
    let value = BigInt(i);
    let prev = BigInt(dp[j]);
    let calc = BigInt(dp[j - price] + i);

    if (prev > value) value = prev;
    if (calc > value) value = calc;

    dp[j] = value.toString();
  }
}

console.log(dp[M].toString());
