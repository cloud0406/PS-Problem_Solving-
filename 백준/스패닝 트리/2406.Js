const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2406.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const parents = Array.from({ length: N + 1 }, (_, i) => i);

let total = 0; // 총 연결 비용
let node = []; // 연결된 간선 정보

const findParent = (x) => {
  if (x !== parents[x]) parents[x] = findParent(parents[x]);
  return parents[x];
};

const union = (a, b) => {
  a = findParent(a);
  b = findParent(b);

  if (a > b) parents[a] = b;
  else parents[b] = a;
};

// 이미 연결된 네트워크 정보 처리
for (let i = 1; i <= M; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  union(u, v);
}

// 연결 여부 확인 -> 본사(1번 컴퓨터)와 연결된 다른 모든 컴퓨터를 확인
const check = new Set();
for (let i = 2; i <= N; i++) {
  check.add(findParent(i));
}

// 이미 모든 컴퓨터가 본사와 연결된 경우 -> 추가 연결 불필요
if (check.size === 1) {
  console.log("0 0");
  process.exit(0);
}

const graph = [];
for (let i = M + 1; i < M + 1 + N; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const edges = [];
for (let i = 1; i < N; i++) {
  for (let j = 1; j < N; j++) {
    edges.push([graph[i][j], i + 1, j + 1]);
  }
}

// 가중치 오름차순
edges.sort((a, b) => a[0] - b[0]);

for (const [value, A, B] of edges) {
  const x = findParent(A);
  const y = findParent(B);

  if (x !== y) {
    if (x > y) parents[x] = y;
    else parents[y] = x;

    node.push([A, B]);
    total += value;
  }
}

console.log(`${total} ${node.length}`);
node.forEach(([a, b]) => console.log(`${a} ${b}`));
