const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16678.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const honors = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

let maxHonor = 1;
let action = 0;

for (const honor of honors) {
  if (honor >= maxHonor) {
    action += honor - maxHonor;
    maxHonor++;
  }
}

console.log(action);
