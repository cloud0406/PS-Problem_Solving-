const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1043.txt"
  )
  .toString()
  .trim()
  .split("\n");
let line = 0;

const readline = () => input[line++];

const [n, m] = readline().split(" ").map(Number);
let knowList = new Set(readline().split(" ").slice(1));

const parties = [];
for (let i = 0; i < m; i++) {
  parties.push(new Set(readline().split(" ").slice(1)));
}

for (let i = 0; i < m; i++) {
  for (const party of parties) {
    if (new Set([...party].filter((x) => knowList.has(x))).size > 0) {
      knowList = new Set([...knowList, ...party]);
    }
  }
}

let cnt = 0;
for (const party of parties) {
  if (new Set([...party].filter((x) => knowList.has(x))).size === 0) {
    cnt++;
  }
}

console.log(cnt);
