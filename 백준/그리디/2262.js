const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2262.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const list = input[1].split(" ").map(Number);
let diff = 0;

let max = n;
for (let i = 0; i < n - 1; i++) {
  const idx = list.indexOf(max);

  if (idx === 0) {
    diff += list[idx] - list[idx + 1];
  } else if (idx === list.length - 1) {
    diff += list[idx] - list[idx - 1];
  } else {
    diff += Math.min(list[idx] - list[idx + 1], list[idx] - list[idx - 1]);
  }

  list.splice(idx, 1);
  max--;
}

console.log(diff);
