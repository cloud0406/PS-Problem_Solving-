const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15558.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, k] = input[0].split(" ").map(Number);

let lines = input.slice(1).map((v) => v.split("").map(Number));

let answer = 0;
let queue = [[0, 0, 0]];

while (queue.length) {
  const [i, j, t] = queue.shift();

  if (i + k >= N) {
    answer = 1;
    break;
  } else if (lines[1 - j][i + k]) {
    queue.push([i + k, 1 - j, t + 1]);
    lines[1 - j][i + k] = 0;
  }
  if (lines[j][i + 1]) {
    queue.push([i + 1, j, t + 1]);
    lines[j][i + 1] = 0;
  }
  if (i - 1 > t && lines[j][i - 1]) {
    queue.push([i - 1, j, t + 1]);
    lines[j][i - 1] = 0;
  }
}

console.log(answer);
