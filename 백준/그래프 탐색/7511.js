const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/7511.txt"
  )
  .toString()
  .trim()
  .split("\n");
let index = 0;
let answer = [];

const t = parseInt(input[index++]);

function find(p, x) {
  if (p[x] !== x) p[x] = find(p, p[x]);

  return p[x];
}

function union(p, a, b) {
  a = find(p, a);
  b = find(p, b);
  if (a < b) p[b] = a;
  else p[a] = b;
}

for (let i = 1; i <= t; i++) {
  const n = parseInt(input[index++]);
  const p = Array.from({ length: n }, (_, i) => i);
  const k = parseInt(input[index++]);

  for (let j = 0; j < k; j++) {
    const [a, b] = input[index++].split(" ").map(Number);
    if (find(p, a) !== find(p, b)) {
      union(p, a, b);
    }
  }

  answer.push(`Scenario ${i}:`);
  const repeat = parseInt(input[index++]);

  for (let m = 0; m < repeat; m++) {
    const [a, b] = input[index++].split(" ").map(Number);

    if (find(p, a) !== find(p, b)) answer.push(0);
    else answer.push(1);
  }

  answer.push("");
}

console.log(answer.join("\n"));
