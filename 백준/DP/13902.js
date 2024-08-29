const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13902.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0].split(" ")[0]);
const M = parseInt(input[0].split(" ")[1]);

const wokSizes = input[1].split(" ").map(Number);
const D = new Array(20001).fill(Number.MAX_SAFE_INTEGER);

for (let i = 0; i < M; i++) {
  for (let j = 0; j < M; j++) {
    if (i === j) D[wokSizes[i]] = 1;
    else D[wokSizes[i] + wokSizes[j]] = 1;
  }
}

for (let i = 1; i <= N; i++) {
  if (D[i] === 1) continue;
  for (let j = 1; j <= Math.floor(i / 2); j++) {
    if (D[i - j] === -1 || D[j] === -1) continue;
    D[i] = Math.min(D[i], D[i - j] + D[j]);
  }
  if (D[i] === Number.MAX_SAFE_INTEGER) D[i] = -1;
}

console.log(D[N]);
