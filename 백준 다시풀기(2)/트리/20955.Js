const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20955.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const parents = Array.from({ length: N + 1 }, (_, v) => v);
let cnt = 0;

function findParent(x) {
  if (x !== parents[x]) parents[x] = findParent(parents[x]);
  return parents[x];
}

function union(a, b) {
  a = findParent(a);
  b = findParent(b);

  if (a < b) parents[b] = a;
  else parents[a] = b;
}

// 1. 사이클 제거 (뉴런 연결 끊기)
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  if (findParent(a) !== findParent(b)) union(a, b);
  else cnt++;
}

// 2. 각 집합 연결 (시냅스로 연결된 뉴런들의 집합끼리 연결 -> 하나의 집합으로)
let parent = findParent(1);
for (let i = 2; i <= N; i++) {
  if (findParent(i) !== parent) {
    union(1, i);
    cnt++;
  }
}

console.log(cnt);
