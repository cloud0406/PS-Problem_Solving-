const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1833.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const costArr = [];
const parent = Array.from({ length: N + 1 }, (_, i) => i);
const edges = [];

for (let i = 1; i <= N; i++) {
  costArr.push(input[i].trim().split(/\s+/).map(Number));
}

function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);

  if (rootA !== rootB) {
    if (rootA < rootB) parent[rootB] = rootA;
    else parent[rootA] = rootB;

    return true;
  }

  return false;
}

let totalCost = 0;
const resultEdges = [];

// 음수 가중치 간선 처리 및 양수 가중치 간선 배열에 추가
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const cost = costArr[i][j];

    // 음수 가중치 간선은 즉시 연결하여 비용을 추가하고 union 수행
    if (cost < 0) {
      totalCost += -cost;
      union(i + 1, j + 1);
    } else if (cost > 0) {
      edges.push([cost, i + 1, j + 1]);
    }
  }
}

// 양수 가중치 간선을 비용 기준으로 오름차순 정렬
edges.sort((a, b) => a[0] - b[0]);

// 순회하며 최소 비용부터 결합
let edgeCount = 0;
for (const [cost, u, v] of edges) {
  if (union(u, v)) {
    totalCost += cost;
    edgeCount++;
    resultEdges.push(`${u} ${v}`);
  }
}

console.log(totalCost, edgeCount);
console.log(resultEdges.join("\n"));
