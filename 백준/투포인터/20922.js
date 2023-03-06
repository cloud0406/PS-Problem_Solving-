const input = require("fs")
  .readFileSync(__dirname + "/input/20922.txt")
  .toString()
  .trim()
  .split("\n");

const [[N, K], arr] = input.map((v) => v.split(" ").map(Number));

const intMap = {};

let maxLength = 0;
let start = 0;
let end = 0;

while (start <= end && end < N) {
  while (intMap[arr[end]] === K) {
    intMap[arr[start]]--;
    start++;
  }

  maxLength = Math.max(maxLength, end - start + 1);
  intMap[arr[end]] = (intMap[arr[end]] ?? 0) + 1;
  end++;
}

console.log(maxLength);
