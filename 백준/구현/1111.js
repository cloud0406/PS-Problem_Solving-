const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1111.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);
const A = input[1].split(" ").map(Number);

if (n === 1) {
  console.log("A");
  return;
}

if (n === 2) {
  if (A[0] !== A[1]) {
    console.log("A");
  } else {
    console.log(A[0]);
  }
  return;
}

const up = A[1] - A[2];
const down = A[0] - A[1];

if (down !== 0 && up % down !== 0) {
  console.log("B");
  return;
}

const a = down === 0 ? 1 : Math.floor(up / down);
const b = A[1] - A[0] * a;

for (let i = 0; i < n - 1; ++i) {
  if (A[i] * a + b !== A[i + 1]) {
    console.log("B");
    return;
  }
}

console.log(A[n - 1] * a + b);
