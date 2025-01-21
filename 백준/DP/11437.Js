const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11437.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const parent = Array(N + 1).fill(0);
const depth = Array(N + 1).fill(0);
const visited = Array(N + 1).fill(0);
const graph = Array.from({ length: N + 1 }, () => []);

// 트리 정보 입력
for (let i = 1; i < N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

// 루트 노드부터의 깊이 구하기
function dfs(x, d) {
  visited[x] = 1;
  depth[x] = d;

  for (const node of graph[x]) {
    if (visited[node]) continue;
    parent[node] = x;
    dfs(node, d + 1);
  }
}

// 최소 공통 조상 찾기
function lca(a, b) {
  // 깊이 맞추기
  while (depth[a] !== depth[b]) {
    if (depth[a] > depth[b]) {
      a = parent[a];
    } else {
      b = parent[b];
    }
  }

  // 노드 맞추기
  while (a !== b) {
    a = parent[a];
    b = parent[b];
  }

  return a;
}

dfs(1, 0);

const M = +input[N];
let result = "";

for (let i = N + 1; i < N + M + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  result += lca(a, b) + "\n";
}

console.log(result.trim());
