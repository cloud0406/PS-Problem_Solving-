const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/24391.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const parent = Array(N + 1).fill(0);

function findParent(x) {
  if (x !== parent[x]) {
    parent[x] = findParent(parent[x]);
  }
  return parent[x];
}

function union(a, b) {
  a = findParent(a);
  b = findParent(b);

  if (a > b) {
    parent[a] = b;
  } else {
    parent[b] = a;
  }
}

for (let i = 1; i <= N; i++) {
  parent[i] = i;
}

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  union(a, b);
}

const L = input[M + 1].split(" ").map(Number);
let total = 0;

for (let i = 1; i < L.length; i++) {
  if (findParent(L[i - 1]) !== findParent(L[i])) {
    total++;
  }
}

console.log(total);
