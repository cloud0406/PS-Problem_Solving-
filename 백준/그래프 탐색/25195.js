const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/25195.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [N, M] = input[line++].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [u, v] = input[line++].split(" ").map(Number);
  graph[u].push(v);
}

const S = +input[line++];
const fans = new Set(input[line++].split(" ").map(Number));

function dfs(node, visited = new Set()) {
  if (fans.has(node)) return false;

  // 리프 노드 도달한 경우 (팬을 만나지 않고 도착)
  if (graph[node].length === 0) return true;

  for (const next of graph[node]) {
    if (!visited.has(next)) {
      visited.add(next);
      if (dfs(next, visited)) return true;

      visited.delete(next);
    }
  }

  return false;
}

console.log(dfs(1) ? "yes" : "Yes");
