const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/7983.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const works = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => b[1] - a[1]);

let today = works[0][1];

for (let [d, t] of works) {
  if (today > t) today = t;
  today -= d;
}

console.log(today);
