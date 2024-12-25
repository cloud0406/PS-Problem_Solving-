const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12892.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, d] = input[0].split(" ").map(Number);
const gifts = input.slice(1).map((line) => {
  const [pos, value] = line.split(" ").map(Number);
  return [pos, value];
});

gifts.sort((a, b) => a[0] - b[0]);

let left = 0;
let right = 0;
let maxValue = 0;
let currentSum = 0;

while (right < n) {
  const distance = gifts[right][0] - gifts[left][0];

  if (distance < d) {
    currentSum += gifts[right][1];
    maxValue = Math.max(maxValue, currentSum);
    right++;
  } else {
    currentSum -= gifts[left][1];
    left++;
  }
}

console.log(maxValue);
