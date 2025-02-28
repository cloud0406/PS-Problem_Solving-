const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/25187.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [N, M, Q] = input[line++].split(" ").map(Number);

const parent = Array.from({ length: N + 1 }, (_, i) => i);

//  -1: 고인 물, 1: 청정 수
const waterTank = [
  0,
  ...input[line++].split(" ").map((x) => (x === "0" ? -1 : 1)),
];

function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);

  if (a < b) {
    waterTank[a] += waterTank[b];
    parent[b] = a;
  } else if (a > b) {
    waterTank[b] += waterTank[a];
    parent[a] = b;
  }
}

for (let i = 0; i < M; i++) {
  const [u, v] = input[line++].split(" ").map(Number);
  union(u, v);
}

const result = [];
for (let i = 0; i < Q; i++) {
  const k = +input[line++];
  result.push(waterTank[find(k)] > 0 ? 1 : 0);
}

console.log(result.join("\n"));
