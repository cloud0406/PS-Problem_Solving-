const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20010.txt"
  )
  .toString()
  .trim()
  .split("\n");

function find(u) {
  if (parent[u] !== u) parent[u] = find(parent[u]);

  return parent[u];
}

function union(u, v) {
  u = find(u);
  v = find(v);

  if (u < v) parent[v] = u;
  else parent[u] = v;
}

function dfs(u, p) {
  let result = [0, u]; // 현재 제일 먼 정점까지의 거리와 그 정점

  for (let [v, w] of graph[u]) {
    if (v === p) continue;
    let [dist, far] = dfs(v, u);
    result = result[0] >= dist + w ? result : [dist + w, far];
  }

  return result;
}

let [N, K] = input[0].split(" ").map(Number);
let edges = input
  .slice(1)
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => a[2] - b[2]); // 간선 정렬

let graph = Array.from({ length: N }, () => []);
let parent = Array.from({ length: N }, (_, i) => i);

let min_cost = 0,
  ct = 0; // 최소 비용, 연결된 간선 수

for (let [u, v, w] of edges) {
  if (find(u) !== find(v)) {
    graph[u].push([v, w]); // 간선 연결
    graph[v].push([u, w]);
    union(u, v);
    min_cost += w;
    ct++;
    // 연결된 간선 수가 N - 1개면 MST 완성이므로 중지
    if (ct === N - 1) {
      console.log(min_cost);
      break;
    }
  }
}

let [_, far] = dfs(0, -1); // 먼저 0번에서 가장 먼 노드를 찾고
console.log(dfs(far, -1)[0]); // 찾은 노드에서 가장 먼 노드까지의 거리가 트리의 지름.
