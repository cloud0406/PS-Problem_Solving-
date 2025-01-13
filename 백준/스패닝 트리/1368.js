const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1368.txt"
  )
  .toString()
  .trim()
  .split("\n");

let parent = [];

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

function solution() {
  const N = +input[0];
  const pq = [];
  parent = Array(N + 1)
    .fill()
    .map((_, i) => i);

  // 직접 물 대는 비용
  for (let i = 1; i <= N; i++) {
    pq.push([+input[i], 0, i]);
  }

  // 논들 사이에 물 대는 비용
  let inputIdx = N + 1;
  for (let i = 1; i <= N; i++) {
    const costs = input[inputIdx++].split(" ").map(Number);
    for (let j = 1; j <= N; j++) {
      if (i === j) continue;
      pq.push([costs[j - 1], i, j]);
    }
  }

  // 비용 기준 오름차순
  pq.sort((a, b) => a[0] - b[0]);

  let total = 0;
  for (const [cost, node1, node2] of pq) {
    if (union(node1, node2)) {
      total += cost;
    }
  }

  console.log(total);
}

solution();
