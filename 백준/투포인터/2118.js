const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2118.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dists = input.slice(1).map(Number);

const ps = new Array(2 * N + 1).fill(0);
for (let i = 0; i < 2 * N; i++) {
  ps[i + 1] = ps[i] + dists[i % N];
}

function sol(N, dists, ps) {
  let ans = 0;
  let total = dists.reduce((acc, val) => acc + val, 0);
  let right = 1;

  for (let left = 0; left < 2 * N; left++) {
    while (
      right < 2 * N + 1 &&
      ps[right] - ps[left] <= total - ps[right] + ps[left]
    ) {
      ans = Math.max(ans, ps[right] - ps[left]);
      right++;
    }
  }

  return ans;
}

console.log(sol(N, dists, ps));
