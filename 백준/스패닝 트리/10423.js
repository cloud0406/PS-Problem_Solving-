const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10423.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [[N, M, K], powerStations, ...edges] = input;

let totalCost = 0;

const parent = Array.from({ length: N + 1 }, (_, i) => i);

edges.sort((a, b) => a[2] - b[2]);

// 발전소들은 같은 집합(-1)으로 처리하여 서로 연결된 상태로 만들기
for (let i = 0; i < K; i++) {
  parent[powerStations[i]] = -1;
}

const findParent = (node) => {
  if (parent[node] < 0) return -1;
  if (parent[node] === node) return node;

  return (parent[node] = findParent(parent[node]));
};

const union = (a, b) => {
  const rootA = findParent(a);
  const rootB = findParent(b);

  if (rootA !== rootB) {
    if (rootA === -1) parent[rootB] = rootA;
    else if (rootB === -1) parent[rootA] = rootB;
    else if (rootA > rootB) parent[rootA] = rootB;
    else parent[rootB] = rootA;
  }
};

// 두 노드가 같은 집합에 있는지 확인
const hasCycle = (a, b) => findParent(a) === findParent(b);

// 간선을 하나씩 처리하며 최소 비용 계산
for (const [u, v, cost] of edges) {
  if (!hasCycle(u, v)) {
    totalCost += cost;
    union(u, v);
  }
}

console.log(totalCost);
