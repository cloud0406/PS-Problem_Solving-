const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19951.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const N = parseInt(input[0].split(" ")[0]);
  const M = parseInt(input[0].split(" ")[1]);
  const H = input[1].split(" ").map(Number);

  const save = Array(N + 1).fill(0);

  for (let i = 2; i < M + 2; i++) {
    const [a, b, k] = input[i].split(" ").map(Number);
    save[a - 1] += k;
    save[b] -= k;
  }

  console.log(save);

  const dp = Array(N + 1).fill(0);
  dp[0] = save[0];

  for (let i = 1; i < N + 1; i++) {
    dp[i] = dp[i - 1] + save[i];
  }

  let result = "";

  for (let i = 0; i < N; i++) {
    result += H[i] + dp[i] + " ";
  }

  return result;
}

console.log(solution());
