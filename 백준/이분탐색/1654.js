const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input/1654.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input
  .shift()
  .split(" ")
  .map((a) => a);

const lines = input.map((a) => a).sort();
let max = Math.max(...lines);
let min = 1;

while (max >= min) {
  let mid = parseInt((min + max) / 2);

  let N = lines.map((line) => parseInt(line / mid)).reduce((a, b) => a + b, 0);

  if (N < k) {
    max = mid - 1;
  } else {
    min = mid + 1;
  }
}

console.log(max);
